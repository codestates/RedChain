
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import '../styles/Campaign_Detail.css';
import axios from 'axios';

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
                    <section className="campaign-item-main-aricle">
                        <article className="campaign-item-main-aricle-img" >
                            <div><img src={`/campaignImg/${id}-0.jpeg`} /></div>
                            <div><img src={`/campaignImg/${id}-1.jpeg`} /></div>
                            <div><img src={`/campaignImg/${id}-2.jpeg`} /></div>
                            <div><img src={`/campaignImg/${id}-3.jpeg`} /></div>
                        </article>
                        
                    </section>
                    <div className="sideBar">
                        <div className="siderBar-top">
                            <span>디데이</span>
                            <p>제목</p>
                            <div>모금액/프로그래스바</div>
                        </div>
                        <div>후원하기버튼</div>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Campaign_Detail;