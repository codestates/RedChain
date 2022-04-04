import React, { useEffect, useState } from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";
import randomboxImg from "../assets/randombox.gif"
import season1 from '../assets/randombox1/season1';
import {Link} from 'react-router-dom';
import {sealBuy} from '../Klaytn/util';

function NftSeal() {
  // 기부 받은 nft 전체 목록 출력.
  // 해당 nft sn

  const [cryptoSeal, setCryptoSeal] = useState([]);  // nft seal 리스트

  // Seal NFT 목록 DonationNFTList 불러오는 APInst DonationNFTList = dummyNFT;
  const onClickHandler = async() => {
   await sealBuy();
  }

  useEffect (async()=> {  
    setCryptoSeal(season1);
    
  },[]);

  return(
    <div id ="supNFT">
      <div className="banner">
        <h1>CRYPTO Seal</h1>
      </div>

      <div id="supNFT-contents">
        { cryptoSeal === null ? 
          <h1>No NFT to display</h1>
          :
          cryptoSeal.map((Seal,idx) => {
            return <Card NFT={Seal} idx={idx} key={idx} img={Seal.img} amount={Seal.amount} text={"/nft/seal/"}/> 
          })
        }
      </div>
      <div className = "randombox"> 
      <Link to={{pathname:`${"/nft/seal/history"}`}} >
          <div className="randombox-box">
          <h1>RandomBox</h1>

            <div className="randombox-img">
              <img src={randomboxImg}></img>
            </div>
            <div>
              <p>20 Klay</p>
            <button className="randombox-button" onClick={onClickHandler}>구매하기</button>

            </div>
          </div>
      </Link>
      </div>
    </div>
  );
}

export default NftSeal;