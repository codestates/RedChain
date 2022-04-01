import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getAccount, addDays } from "../Klaytn/util";
import BidTable from "../components/bidTable";
import "../styles/NftAuctionView.css";
import axios from 'axios';
import Caver from 'caver-js';
import AuctionABI from '../Klaytn/AuctionABI'



function NftAuctionView({auctionList}) {
  const id = useParams().id;

  const [auctionInfo, setAuctionInfo] = useState({
    startAt:auctionList[id-1].startAt,
    endAt:auctionList[id-1].endAt,
    highestBid:auctionList[id-1].highestBid,
    tokenURI:auctionList[id-1].tokenURI,
    auctionAddress:auctionList[id-1].auctionAddress,
  });
  const [orderbook, setOrderbook] = useState([]);
  const [biddingPrice,setbiddingPrice] = useState(0);
  const [count, setCount] = useState(0);

  const colNames = ['순번','응찰자', '응찰가격', '응찰날짜'];

  const [day, setDay] =useState(-1);
  const [hour, setHour] =useState(-1);
  const [min, setMin] =useState(-1);
  const [sec, setSec] =useState(-1);

  const times = new Date(auctionInfo.endAt);
  const today = new Date();
  const diff = times - today;

 
    const getOrderbook = async() => {  // 응찰내역
      await axios.get(`http://localhost:4000/auction/detail/${id}`)
      .then((res)=> {
        if(res.data === null) {
          setOrderbook(0);
        } else {
          console.log(res.data);
          setOrderbook(res.data);
        }
      })
      .catch((err) => console.log(err));
    }


  const bidding = async() => {  // 응찰 함수
    if(auctionInfo.highestBid < biddingPrice) {
      let now;
      const account = await getAccount();  // account[0] 에 내 주소값 들어가있음.
      const caver = new Caver(window.klaytn);
      const AuctionContract = new caver.klay.Contract(AuctionABI, auctionInfo.auctionAddress);
      await AuctionContract.methods.bid().send({
        from: account[0],
        value: caver.utils.toPeb(biddingPrice,'KLAY'),
        gas: 100000,
      }).then(async(tx) => {

        if(tx) {
          now = addDays(new Date(), 0);
          await axios.post(`http://localhost:4000/orderbook/${id}`, {
            bidder: account[0],
            bid:biddingPrice,
            createdAt: now,
          })
          .then((res)=> {
              console.log(res.data);
              const newOrder = {
                auctionId:id,
                bidder: account[0],
                bid:biddingPrice,
                createdAt: now,
              }
              setOrderbook([...orderbook, newOrder]);
              setAuctionInfo({
                startAt: auctionInfo.startAt,
                endAt: auctionInfo.endAt,
                tokenURI: auctionInfo.tokenURI,
                auctionAddress: auctionInfo.auctionAddress,
                highestBid: biddingPrice,
              })
          })
          .catch(err => console.log(err));
        }

      })
    }
    else {
      alert(`현재 최고 응찰가보다 높게 응찰해 주세요.`)
    }  
  }

  useEffect (()=> {
    getOrderbook();

    },[]);

    useEffect (() => {  //count 1s에 한번씩 남은시간 업로드.
      setTimeout(() => { setCount(count + 1) }, 1000); // 1s
  
      setDay( String(Math.floor(diff / (1000*60*60*24))) );
      setHour( String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0") );
      setMin( String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0") );
      setSec( String(Math.floor(diff / 1000 % 60)).padStart(2,"0") );
    },[count])

  return(
    <div className="view">
      <div className="view__img">  {/* NFT 이미지 */}
        <img src={auctionInfo.tokenURI} alt="토큰URI" />
      </div>
      <div className="view__contents"> {/* NFT 관련 내용. */}
        <div className="view__donated" >
          <span>donated by </span>
          <div>{auctionInfo.donor}</div>  {/* 여기에 기증자 이름!!!! */}
        </div>

        <div className="view__in">
          <div className="view__info">
            <div className="view__endtAt">
              <div>Sale starts {auctionInfo.startAt}</div>
              <div>Sale ends {auctionInfo.endAt}</div>
              <div className="view__check"> {/* 남은시간 체크 */}
                <div className="view__timebox">  
                  <div>{day}</div>
                  <p>Days</p>
                </div>
                <div className="view__timebox">  
                  <div>{hour}</div>
                  <p>Hours</p>
                </div>
                <div className="view__timebox">  
                  <div>{min}</div>
                  <p>Minutes</p>
                </div>
                <div className="view__timebox">  
                  <div>{sec}</div>
                  <p>Seconds</p>
                </div>
              </div>
            </div>
          </div>
          <div className="view__info">
            <div >
              <div>Highest bidding price </div>
              <span className="view__price">{auctionInfo.highestBid} </span>
              <span> KLAY</span>
            </div>
          </div>
          <div className="view__input">
            <input type="number" value={biddingPrice} onChange={(e)=>{setbiddingPrice(e.target.value)}}/>
            <button type="button" className="view__button" onClick={bidding}>응찰</button>
          </div>
        </div>
        <div className="view__bidHistoy">
          <BidTable list={orderbook} colNames={colNames}/>
        </div>
      </div>
    </div>
  );
}

export default NftAuctionView;