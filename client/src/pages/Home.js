import {React, useEffect, useState} from "react";
import axios from "axios"
import {BiDonateHeart,BiHomeHeart} from "react-icons/bi";
import {FaDollarSign} from "react-icons/fa";
import sedBoy from "../assets/sedBoy.jpg"


function Home() {
  const [userList, setUserList] = useState('');
  const [price, setPrice] = useState('12345');
  const [supCount, setSupCount] = useState('45678');
  const [camCount,setCamCount] = useState('7890');

  // var addr = process.env.SERVER_ADDR;

  // useEffect(async () => {    //  정보를 어떻게 넘겨주는지 확인 필요! 통째로 주는지 or 필요한 정보만 주는지...
  //   // /total api 적용.
  //   try {
  //     axios.get("http://localhost:4000" + "/total")
  //     .then(res => {
  //       setUserList(res.data);
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },[]);

  const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  

  return (
    <div >
      <div className="home-img">
        <img src={sedBoy} alt="sed Boy" /> 
        {/* <div className="home-img__img"></div> */}
        <div className="home-img__contents">
          <div className="home-img__title">Red Chain, 여러분의 사랑을 기다리고 있습니다.</div>
          <div >저희 Red chain은 블록체인 기술을 통해 투명하게 운영하고 있습니다.</div>
        </div>
      </div>
      <div id="home-title">
        <h2>Red Chain에 닿은 사랑의 손길</h2>
        <div>여러분의 사랑으로 세상이 따뜻해지고 있습니다.</div>
      </div>
      <div id="home-content">
        <div className="home-content__support">
          <div className="home-content__title">
            <FaDollarSign className="home-content__i"/>
            <div>후원 금액</div>
          </div>
          <div className="home-content__contents">
            <span>{comma(price)}</span>
            <em>KLAY</em>
            </div>
        </div>
        <div className="home-content__support">
          <div className="home-content__title">
            <BiDonateHeart className="home-content__i"/>
            <div>후원 횟수</div>
          </div>
          <div className="home-content__contents">
            <span>{comma(supCount)}</span>
            <em>건</em>
            </div>
        </div>
        <div className="home-content__support">
          <div className="home-content__title">
            <BiHomeHeart className="home-content__i"/>
            <div>캠페인 수</div>
          </div>
          <div className="home-content__contents">
            <span>{comma(camCount)}</span> 
            <em>건</em>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;