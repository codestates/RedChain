import {useEffect, useState} from "react";
import '../styles/Campaign.css'
import{FaChevronLeft, FaChevronRight} from 'react-icons/fa';

import axios from 'axios';
import {Link} from 'react-router-dom';
import Campaign_Card from "../components/Campaign_Card";


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
      <h1  className="campaign-title">Campaign</h1>
      
      <div className="campaign-items-wrap">
          <FaChevronLeft onClick={preBtn} className="campaign-items-chevron"/>
          <ul className="campaign-items">
              <Link to={{pathname:`/campaign/detail/${leftItem.id}`}}>
                <Campaign_Card item={leftItem}/>
              </Link>
              <Link to={{pathname:`/campaign/detail/${centerItem.id}`}}>
              <li className="campaign-items-center"
              style={{backgroundImage:`url(/campaignImg/${centerItem.id}.jpeg)`}}>메인캠페인
                   
                      <div className="campaign-item-center-info">
                      <h1>{centerItem.title}</h1>
                      <p>{centerItem.group}</p>
                      <p>D-Day: {centerItem.dday}</p>
                      <progress value="22" max="100"></progress>
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
    </div>
  );
}

export default Campaign;

/* 
    <li className="campaign-items-side"
              style={{backgroundImage:`url(/campaignImg/${rightItem.id}.jpeg)`}}>우측캠페인
                      <div className="campaign-item-info">
                        <h1>{rightItem.title}</h1>
                        <p>{rightItem.group}</p>
                        <p>D-Day: {rightItem.dday}</p>
                        <progress value="17" max="100"></progress>
                        <p>{rightItem.amount}</p>
                      </div>
              </li>
*/