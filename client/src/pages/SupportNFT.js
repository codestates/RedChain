import {React, useState} from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";
import axios from "axios";
import dummyNFT from "../components/dummyNFT";

function SupportNFT() {
  // 1. 내가 가지고 있는 nft 출력. --> 내 지갑주소 이용해서.
  // 2. 여기서 '기부'를 누르면 nft 경매페이지에 해당 nft가 보이고 여기서는 더 이상 안보이게 한다.
  // const [NFTList, setNFTList] = useState([]);

  // setNFTList(dummyNFT);   //  -> 내 지갑주소 이용해 내 주소에 있는 nft 출력. 혹시 컨트랙트 주소 필요하면 그걸 입력하는 란을 만들어야한다.

  const NFTList = dummyNFT;

  const support = () => {
    // 기부 API
  }

  return(
    <div id ="supNFT">
      <div id="supNFT-title">
        <h2>NFT 기부</h2>
        <div>여러분께 기부 받은 NFT의 판매금액은 후원금액으로 사용됩니다.</div>
      </div>
      <div id="supNFT-contents">
        {
          NFTList.length === 0 ?
          <h1>No NFT to display</h1>
          :
          NFTList.map((nft,idx) => {
            return <Card nft={nft} key={idx} action={support} text="Support" />  /*  */
          })
        }
      </div>
    </div>
  );
}

export default SupportNFT;