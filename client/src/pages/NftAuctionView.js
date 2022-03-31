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

  return(
    <div className="view">
      <div className="view__img">  {/* NFT 이미지 */}
        <img src={auctionInfo.tokenURI} alt="토큰URI" />
      </div>
      <div className="view__contents"> {/* NFT 관련 내용. */}
        <div className="view__in">
          <div className="view__info">
            <div className="view__startAt">시작날짜 : {auctionInfo.startAt}</div>
            <div className="view__endtAt">종료날짜 : {auctionInfo.endAt}</div>
            <div className="view__price">최고 응찰가 : {auctionInfo.highestBid}</div>
            
          </div>
          <div className="view__input">
            <input type="number" value={biddingPrice} onChange={(e)=>{setbiddingPrice(e.target.value)}}/>
            <button type="button" className="view__button" onClick={bidding}>응찰</button>
          </div>
        </div>
        <div className="view__bidHistoy">
          <BidTable list={orderbook} />
        </div>
      </div>
    </div>
  );
}

export default NftAuctionView;