
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import '../styles/Campaign_Detail.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Campaign_Detail() { 

    const id = useParams().id;
    
    useEffect(async()=> {
    // await axios.get(`http://localhost:4000/campaign/detail/${id}`)
    // .then((res)=> {})
    // .catch((err) => console.log(err));
    },[])

    return (
        <div className="campaign_item">
            <section className="campaign-item-banner-wrap"
             style={{backgroundImage:`url(/campaignImg/${id}_banner.jpeg)` }}
            >
                <div className="campaign-item-banner">
                    <h2><strong>group</strong></h2>
                    <h1><strong>타이틀</strong></h1>
                </div>
            </section>
            <div className="campaign-item-main-wrap">
                <div className="campaign-item-main">
                    <div className="sideBar">
                        <div className="siderBar-top">
                            <span className="sideBar-top-dday">디데이</span>
                            <h2 className="sideBar-top-title">제목</h2>
                            <span className="siderBar-top-fund">모금액</span>
                            <progress value="22" max="100"></progress>
                            <ul>모금 전달 안내
                                <li>모금 종료시 전액 일시 전달</li>
                            </ul>
                            <ul>모금 성공 조건 안내
                                <li>5,000,000원 달성 시 조기 종료</li>
                            </ul>
                        </div>
                        <div>
                            <Link to="/support/coin"><button className="sideBar-button">후원하기버튼</button></Link>
                        </div>
                    </div>
                    <section className="campaign-item-main-aricle">
                        <article className="campaign-item-main-aricle-img" >
                            <div><img src={`/campaignImg/${id}-0.jpeg`} /></div>
                            <div><img src={`/campaignImg/${id}-1.jpeg`} /></div>
                            <div><img src={`/campaignImg/${id}-2.jpeg`} /></div>
                            <div><img src={`/campaignImg/${id}-3.jpeg`} /></div>
                        </article>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Campaign_Detail;