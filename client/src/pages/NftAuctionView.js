import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getAccount } from "../Klaytn/KIP17";
import BidTable from "../components/bidTable";
import "../styles/NftAuctionView.css";

import dummyNFT from "../components/dummyNFT";
import dummyBidding from "../components/dummyBidding";


// NFT에 들어가 있는 정보 : img, 기부한 날짜, 현재 가격
// NFT에 X, 보여줄 수 있는 정보 : 판매종료 날짜(기부날짜 + 2 week), 
// 확인사항??!! 옥션에 응시했던사람들 목록?, 기부자 내용?

function NftAuctionView() {
  const [auctionInfo, setAuctionInfo] = useState([]);
  const [biddigInfo, setBiddigInfo] = useState([]);
  const [biddingPrice,setbiddingPrice] = useState(0);
  const [count, setCount] = useState(0);

  const id = useParams().id;
  const colNames = ['응찰자', '응찰가격', '응찰날짜'];

  const [day, setDay] =useState(-1);
  const [hour, setHour] =useState(-1);
  const [min, setMin] =useState(-1);
  const [sec, setSec] =useState(-1);

  const times = new Date(auctionInfo.end_at);
  const today = new Date();
  const diff = times - today;

  // console.log(`time : ${times} today : ${today}`)
  
  useEffect (async()=> {  
    setAuctionInfo(dummyNFT[id-1]);  // dummy
    setBiddigInfo(dummyBidding);     // dummy

    getAuction();
    getbiddig();
    
    
  },[]);

  useEffect (() => {  //count 1s에 한번씩 남은시간 업로드.
    setTimeout(() => { setCount(count + 1) }, 1000); // 1s

    setDay( String(Math.floor(diff / (1000*60*60*24))) );
    setHour( String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0") );
    setMin( String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0") );
    setSec( String(Math.floor(diff / 1000 % 60)).padStart(2,"0") );
  },[count])

  
  const getAuction = () => {  // tokenId가 id 인 NFT 호출해서 auctionInfo에 저장.
    // await axios.get(`http://localhost:4000/nft/auction/${id}`)
    // .then((res)=> {})
    // .catch((err) => console.log(err));
  }

  const getbiddig = () => {  // 해당 NFT 게시글에 맞는 응찰내역 호출해서 biddigInfo에 저장

  }


  const bidding = async() => {  // 응찰 함수
    // 1. 나의 주소가 필요. 나의 응찰희망가격이 필요.
    // 2. 디비에 해당 tokenId에 맞는 것에주소랑 응찰가격이랑 넣기. --> 최고 응찰가보다 작으면 거절.

    if(auctionInfo.bid_price < biddingPrice) {
      const account = await getAccount();  // account 에 내 주소값 들어가있음.


      // DB에 tokenId에 맞는 NFT에 응찰한 주소랑 응찰가격 을 저장하는 API
      // API 성공하면 자동으로 새로고침해서 최고 응찰가 업글 하기.
      
      
    } else {
      alert(`현재 최고 응찰가보다 높게 응찰해 주세요.`)
    }
    
  }

  
  
  //  img donor end_at bid_price
  return(
    <div className="view">
      <div className="view__img">  {/* NFT 이미지 */}
        <img src={auctionInfo.img} alt="" />
      </div>
      <div className="view__contents"> {/* NFT 관련 내용. */}
        <div className="view__donated" >
          <span>donated by </span>
          <div>{auctionInfo.donor}</div>
        </div>

        <div className="view__in">
          <div className="view__info">
            {/* <div className="view__startAt">시작날짜 : {auctionInfo.create_at}</div> */}
            <div className="view__endtAt">
              <div>Sale ends {auctionInfo.end_at}</div>
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
              <span className="view__price">{auctionInfo.bid_price} </span>
              <span> KLAY</span>
            </div>
          </div>
          <div className="view__input">
            <input type="number" value={biddingPrice} onChange={(e)=>{setbiddingPrice(e.target.value)}}/>
            <button type="button" className="view__button" onClick={bidding}>응찰</button>
          </div>
        </div>
        <div className="view__bidHistoy">
          <BidTable list={biddigInfo} colNames={colNames}/>
        </div>
      </div>
    </div>
  );
}

export default NftAuctionView;