import React, { useEffect, useState } from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";
import dummyNFT from "../components/dummyNFT";

function NftSeal() {
  // 기부 받은 nft 전체 목록 출력.
  // 해당 nft sn

  const [DonationNFTList, setDonationNFTList] = useState([]);  // nft seal 리스트

  // Seal NFT 목록 DonationNFTList 불러오는 APInst DonationNFTList = dummyNFT;
  useEffect (async()=> {  
    setDonationNFTList(dummyNFT);
    
  },[]);

  return(
    <div id ="supNFT">
      <div id="supNFT-title">
        <h2>NFT Seal</h2>
        <div>기부 받은 NFT 경매페이지이며, 이곳의 수익은 후원금액으로 사용됩니다.</div>
      </div>
      <div id="supNFT-contents">
        { DonationNFTList === null ? 
          <h1>No NFT to display</h1>
          :
          DonationNFTList.map((NFT,idx) => {
            return <Card NFT={NFT} idx={idx} key={idx} onErrorImg={NFT.img} text={"/nft/seal/"}/> 
          })
        }
      </div>
    </div>
  );
}

export default NftSeal;