import React, { useEffect, useMemo, useState } from "react";
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
  const [account, setAccount] = useState("");
  const [biddingPrice,setbiddingPrice] = useState(0);

  const id = useParams().id;
  const colNames = ['Nickname', 'Address', 'Bidding Price'];
  
  useEffect (async()=> {  
    setAuctionInfo(dummyNFT[id-1]);  // dummy
    setBiddigInfo(dummyBidding);     // dummy

    getAuction();
    getbiddig();
    // table();
    
    },[]);

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
      const EOA = await getAccount();
      setAccount(EOA);
      console.log("account : " + EOA);
      console.log("account__ : " + account);   // 여긴 안들어가 있지.
      console.log("biddingPrice : "+ biddingPrice);


      // DB에 tokenId에 맞는 NFT에 응찰한 주소랑 응찰가격 을 저장하는 API
      // API 성공하면 자동으로 새로고침해서 최고 응찰가 업글 하기.
      
    } else {
      alert(`현재 최고 응찰가보다 높게 응찰해 주세요.`)
    }
    
  }

  // useEffect(()=> {
  //   console.log("222 account : "+ account)   // 여기에는 들어가있음
  // },[account])

  // const table = () => {
  //   columns = useMemo(() => columnData, []);
  //   data = useMemo(() => biddigInfo,[biddigInfo])
  //  }


  

  return(
    <div className="view">
      <div className="view__img">  {/* NFT 이미지 */}
        <img src={auctionInfo.img} alt="" />
      </div>
      <div className="view__contents"> {/* NFT 관련 내용. */}
        <div className="view__info">
          <div className="view__startAt">시작날짜 : {auctionInfo.create_at}</div>
          <div className="view__endtAt">종료날짜: {auctionInfo.end_at}</div>
          <div className="view__price">최고 응찰가: {auctionInfo.bid_price}</div>
        </div>
        <div className="view__input">
          <input type="number" value={biddingPrice} onChange={(e)=>{setbiddingPrice(e.target.value)}}/>
          <button type="button" className="view__button" onClick={bidding}>응찰</button>
        </div>
        <div className="view__bidHistoy">
          <BidTable list={biddigInfo} colNames={colNames}></BidTable>
        </div>
      </div>
    </div>
  );
}

export default NftAuctionView;