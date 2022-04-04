import {useEffect, useState} from "react";
import '../styles/Campaign.css'
import{FaChevronLeft, FaChevronRight} from 'react-icons/fa';

import axios from 'axios';
import {Link} from 'react-router-dom';
import Campaign_Card from "../components/Campaign_Card";
import klaytn_logo from "../assets/klaytn.png"
import redChain from "../assets/redChain.png"




function Campaign() {
  const [campaignInfo, setCampaignInfo] = useState(null);

  const [leftItem, setLeftItem] = useState({id:0});
  const [centerItem, setCenterItem] = useState({id:1});
  const [rightItem, setRightItem] = useState({id:2});

  const preBtn = () => {
    
    if(leftItem.id === 0) {
      setLeftItem(campaignInfo[campaignInfo.length-1])
      setCenterItem(campaignInfo[0])
      setRightItem(campaignInfo[1])
    } else if(centerItem.id === 0) {
      setLeftItem(campaignInfo[campaignInfo.length-2])
      setCenterItem(campaignInfo[campaignInfo.length-1])
      setRightItem(campaignInfo[0])
    } else if(rightItem.id === 0) {
      setLeftItem(campaignInfo[campaignInfo.length-3])
      setCenterItem(campaignInfo[campaignInfo.length-2])
      setRightItem(campaignInfo[campaignInfo.length-1])
    } else {
      setLeftItem(campaignInfo[leftItem.id - 1])
      setCenterItem(campaignInfo[centerItem.id -1])
      setRightItem(campaignInfo[rightItem.id -1])
    }
  }

  
  const nextBtn = () => {
    const last = campaignInfo.length-1

    if(rightItem.id === last) {
      setLeftItem(campaignInfo[0])
      setCenterItem(campaignInfo[last])
      setRightItem(campaignInfo[last-1])
    } else if(centerItem.id === last) {
      setLeftItem(campaignInfo[last])
      setCenterItem(campaignInfo[0])
      setRightItem(campaignInfo[1])
    } else if(leftItem.id === last) {
      setLeftItem(campaignInfo[0])
      setCenterItem(campaignInfo[1])
      setRightItem(campaignInfo[2])
    } else {
      setLeftItem(campaignInfo[leftItem.id + 1])
      setCenterItem(campaignInfo[centerItem.id + 1])
      setRightItem(campaignInfo[rightItem.id + 1])
    }
    
  }

  const getCampaignInfo = async() => {
    await axios.get("http://localhost:4000/campaign")
   .then((res) => {
     setLeftItem(res.data[0]);
     setCenterItem(res.data[1]);
     setRightItem(res.data[2]);
     setCampaignInfo(res.data);
   })
  }



  useEffect(async() => {
   await getCampaignInfo();
  },[])


  return (
    <div className="campaign">
      <div className="banner">
        <h1>Campaign</h1>
      </div>
      <div className="campaign-items-wrap">
          <FaChevronLeft onClick={preBtn} className="campaign-items-chevron"/>
          <ul className="campaign-items">
              <Link to={{pathname:`/campaign/detail/${leftItem.id}`}}>
                <Campaign_Card item={leftItem}/>
              </Link>
              <Link to={{pathname:`/campaign/detail/${centerItem.id}`}}>
              <li className="campaign-items-center"
              style={{backgroundImage:`url(/campaignImg/${centerItem.id}.jpeg)`}}>
                   
                      <div className="campaign-item-center-info">
                      <h1>{centerItem.title}</h1>
                      <p>{centerItem.group}</p>
                      <p>종료일: {centerItem.endAt}</p>
                      <progress value={centerItem.amunt / centerItem.goal * 100} max="100"></progress>
                      <p>{centerItem.amount}</p>
                    </div>
              </li>
              </Link>
              <Link to={{pathname:`/campaign/detail/${rightItem.id}`}}>
              <Campaign_Card item={rightItem}/>
          
              </Link>
          </ul>
          
          <FaChevronRight onClick={nextBtn} className="campaign-items-chevron"/>
      </div>
      <div className="campaign-banner">
        <img src={`/campaign-banner.jpeg`}></img>
      </div>
      <div className="campaign-subscribe">
          <div>
              <img className="campaign-logo-img" src={redChain}></img>
          </div>
          <div className="campaign-subscribe-email-wrap">
              <h2>레드체인 새로운 소식 구독하기</h2>
              <div >
                <input className="campaign-subscribe-email"></input>
                <button type="email" className="campaign-subscribe-button">소식받아보기</button>
              </div>
          </div>
          <div>
              <img className="campaign-logo-img" src={klaytn_logo}></img>
          </div>
      </div>
    </div>
  );
}

export default Campaign;
