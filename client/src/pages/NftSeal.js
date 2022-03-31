import React, { useEffect, useState } from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";
import dummyNFT from "../components/dummyNFT";
import randomboxImg from "../assets/randombox.gif"
import axios from "axios";
import Caver from 'caver-js';
import SealABI from "../Klaytn/SealABI";
import season1 from '../assets/randombox1/season1';

function NftSeal() {
  // 기부 받은 nft 전체 목록 출력.
  // 해당 nft sn

  const [DonationNFTList, setDonationNFTList] = useState([]);  // nft seal 리스트

  // Seal NFT 목록 DonationNFTList 불러오는 APInst DonationNFTList = dummyNFT;
  const BuyButton = async() => {
    const contractAddress = "0x4491c6193C54CCF990cbb47E2900372Ca32F16cf";
    await window.klaytn.enable();
    const caver = new Caver(window.klaytn)
    const sealContract = new caver.klay.Contract(SealABI, contractAddress);
    await sealContract.methods.buy().send({
      from: window.klaytn.selectedAddress,
      gas: '50000',
      value: caver.utils.toPeb(1,'KLAY'),
      gasPrice: null,
    }).then(async(tx) => {
      //0xde0b6b3a7640000 = 10 ** 18 = 1klay
      if(tx.value = "0xde0b6b3a7640000") {
        await axios.post('http://localhost:4000/buy/seal', {
          // transactionHash: tx.transactionHash,
          account : window.klaytn.selectedAddress,
          tokenId : parseInt(tx.events[0].raw.data),
        }).then((res)=> console.log(res));
      }
    }).catch(err => console.log(err));
  }

  useEffect (async()=> {  
    setDonationNFTList(season1);
    
  },[]);

  return(
    <div id ="supNFT">
      <div id="supNFT-title">
        <h2>CRYPTO Seal</h2>
        <div>기부 받은 NFT 경매페이지이며, 이곳의 수익은 후원금액으로 사용됩니다.</div>
      </div>
      <div id="supNFT-contents">
        { DonationNFTList === null ? 
          <h1>No NFT to display</h1>
          :
          DonationNFTList.map((NFT,idx) => {
            return <Card NFT={NFT} idx={idx} key={idx} img={NFT.img} quantity={NFT.quantity} text={"/nft/seal/"}/> 
          })
        }
      </div>
      <div className = "randombox"> 
          <h1>RandomBox</h1>
          <div className="randombox-box">
            <div className="randombox-img">
              <img src={randomboxImg}></img>
            </div>
            <div>
              30 Klay
            </div>
            <button onClick={BuyButton}>구매하기</button>
          </div>

      </div>
    </div>
  );
}

export default NftSeal;