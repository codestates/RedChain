import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getAccount } from "../Klaytn/KIP17";
import BidTable from "../components/bidTable";
import "../styles/NftAuctionView.css";

import dummyNFT from "../components/dummyNFT";
import dummyBidding from "../components/dummyBidding";


function NftSealView() {
  const [sealInfo, setSealInfo] = useState([]);
  const [biddigInfo, setBiddigInfo] = useState([]);

  const id = useParams().id;
  
  useEffect (async()=> {  
    setSealInfo(dummyNFT[id-1]);  // dummy
    setBiddigInfo(dummyBidding);     // dummy

    getAuction();
    getbiddig();
    
    },[]);

    const getAuction = () => {  // tokenId가 id 인 NFT 호출해서 sealInfo에 저장.
      // await axios.get(`http://localhost:4000/nft/seal/${id}`)
      // .then((res)=> {})
      // .catch((err) => console.log(err));
    }

    const getbiddig = () => {  // 해당 NFT 게시글에 맞는 응찰내역 호출해서 biddigInfo에 저장

    }


  const buy = async() => {  // 구매 함수
    // 1. 나의 주소가 필요. 
    // 2. 디비에 해당 tokenId에 맞는 것이 판매 됨을 표시하고 트랜스퍼 처리하기.

    const account = await getAccount();  // account 에 내 주소값 들어가있음.

    // await axios.post(`http://localhost:4000/nft/seal`)
    // .then((res)=> {})
    // .catch((err) => console.log(err));    
    
  }
  

  return(
    <div className="view">
      <div className="view__img">  {/* NFT 이미지 */}
        <img src={sealInfo.img} alt="" />
      </div>
      <div className="view__contents"> {/* NFT 관련 내용. */}
        <div className="view__in">
          <div className="view__info">
            <div className="view__startAt">시작날짜 : {sealInfo.create_at}</div>
            <div className="view__price">판매가: {sealInfo.bid_price}</div>
          </div>
          <div className="view__input">
            <button type="button" className="view__button" onClick={buy}>구매</button>
          </div>
        </div>
        <div className="view__bidHistoy">
          <BidTable list={biddigInfo} />
        </div>
      </div>
    </div>
  );
}

export default NftSealView;