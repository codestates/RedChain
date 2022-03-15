import {React, useEffect, useState} from "react";
import axios from "axios"
import love from "../assets/love.png"
import coin from "../assets/dollar.png"
import doc from "../assets/love-letter.png"


function Home() {
  const [userList, setUserList] = useState('');
  const [price, setPrice] = useState('123');
  const [supCount, setSupCount] = useState('456');
  const [camCount,setCamCount] = useState('789');

  // var addr = process.env.SERVER_ADDR;

  useEffect(async () => {    //  정보를 어떻게 넘겨주는지 확인 필요! 통째로 주는지 or 필요한 정보만 주는지...
    // /total api 적용.
    try {
      axios.get("http://localhost:4000" + "/total")
      .then(res => {
        setUserList(res.data);
      })
    } catch (err) {
      console.log(err);
    }
  },[]);

  

  return (
    <div id="home">
      <div id="home_title">
        <h2>Red Chain에 닿은 사랑의 손길</h2>
        <div>여러분의 사랑으로 세상이 따뜻해지고 있습니다.</div>
      </div>
      <div id="home_support">
        <div className="home__support">
          <div className="home__support__title">
            <img src={coin}/>
            <div>후원 금액</div>
          </div>
          <div className="home__support__contents">
            <span>{price}</span>
            <em>KLAY</em>
            </div>
        </div>
        <div className="home__support">
          <div className="home__support__title">
            <img src={love} />
            <div>후원 횟수</div>
          </div>
          <div className="home__support__contents">
            <span>{supCount}</span>
            <em>건</em>
            </div>
        </div>
        <div className="home__support">
          <div className="home__support__title">
            <img src={doc}/>
            <div>캠페인 수</div>
          </div>
          <div className="home__support__contents">
            <span>{camCount}</span> 
            <em>건</em>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;