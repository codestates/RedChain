import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BidTable from "../components/bidTable";
import "../styles/NftAuctionView.css";
import randomboxImg from "../assets/randombox.gif"
import axios from 'axios';
import {sealBuy} from '../Klaytn/util';

function NftSealView() {
  const [sealInfo, setSealInfo] = useState([]);
  const [biddigInfo, setBiddigInfo] = useState([]);
  const [randomboxAmount, setRandomboxAmount] = useState(0);

  const id = useParams().id;
  const colNames = ['순번','구매자', '구매날짜'];
  
 
 //axios주소변경
 const getAmountInfo = async() => {
  await axios(process.env.REACT_APP_API_URL+'/seal/amount')
    .then((res) => {
      setRandomboxAmount(res.data);
    }).catch(err => console.log(err)); 
 }
 const getHisotry = async() => {
   await axios.get(process.env.REACT_APP_API_URL+'/seal/history')
   .then(res => setBiddigInfo[res.data])
   .catch(err => console.log(err));
 }

  const onClickHandler = async() => {  // 구매 함수
    await sealBuy();
    
  }

  useEffect (async()=> {  
    getAmountInfo();
    getHisotry();
  },[]);

  return(
    <div className="view">
      <div className="view__img">  {/* NFT 이미지 */}
        <img src={randomboxImg} alt="" />
      </div>
      <div className="view__contents"> {/* NFT 관련 내용. */}
        <div className="view__in">
          <div className="view__info">
            <div className="view__startAt">Sale starts  {sealInfo.create_at}</div>
            
          </div>
          <div className="view__info">
            <div >
                <div>RandomBox price </div>
                <span className="view__price"> </span>
                <span> 20 KLAY</span>
              </div>
          </div>
          <div className="view__total">랜덤박스 남은 갯수 : {randomboxAmount}</div>
          <div className="view__input">
            <button type="button" className="view__button" onClick={onClickHandler}>구매</button>
          </div>
        </div>
        <div className="view__bidHistoy">
          <BidTable list={biddigInfo} colNames={colNames} />
        </div>
      </div>
    </div>
  );
}

export default NftSealView;