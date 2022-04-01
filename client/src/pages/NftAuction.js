import React, { useEffect, useState } from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";

function NftAuction({getAuctionList, auctionList}) {
  // 기부 받은 nft 전체 목록 출력.
  // 해당 nft sn
 

  // 기부받은 NFT 목록 auctionList 불러오는 API
  useEffect (async()=> {  
    getAuctionList();
  },[]);

  return(
    <div id ="supNFT">
      <div className="banner">
        <h1>NFT Auction</h1>
      </div>
      {/* <div id="supNFT-title">
        <h2>NFT Auction</h2>
        <div>기부 받은 NFT 경매페이지이며, 이곳의 수익은 후원금액으로 사용됩니다.</div>
      </div> */}
      <div id="supNFT-contents">
        { auctionList === null ? 
          <h1>No NFT to display</h1>
          :
          auctionList.map((NFT,idx) => {
            return <Card NFT={NFT} idx={idx} key={idx} img={NFT.tokenURI} text={"/nft/auction/"}/>
          })
        }
      </div>
    </div>
  );
}

export default NftAuction;