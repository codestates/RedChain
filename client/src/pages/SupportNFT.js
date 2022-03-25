import {React, useState, useEffect} from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";
import axios from "axios";
import {getAccount, classify} from "../Klaytn/KIP17"
import Caver from 'caver-js';
import ABI from '../Klaytn/ABI'

function SupportNFT() {
  const [account, setAccount] = useState(null);

  const [NFTList, setNFTList] = useState([]);
  const [errImgList, setErrImgList] = useState({});

  const donation = async (contractAddress, tokenId) => {
    const token = tokenId.slice(2);
    console.log(token);
    await window.klaytn._kaikas.isApproved()
    .then(async(res) => {
      if(res) {
       const from = (window.klaytn.selectedAddress)
      //  const to = '0x3d7a899250aDBaA826A45603da5240f1ca12C88F';
      const to ='0xB76417Fe5F4Dbe4206a85ca09070947c3ee9D079';
       const caver = new Caver(window.klaytn);
       const kip17 = new caver.klay.Contract(ABI, contractAddress)
       await kip17.methods.transferFrom(from, to, token)
       .send({
         from,
         gas: '8500000',
         gasPrice: null,
       })
      }
    })
    const refreshNFTList = NFTList.filter((item)=>  (!(item.contractAddress === contractAddress && item.tokenId === tokenId)))
    console.log(refreshNFTList)
    setNFTList([...refreshNFTList]);
    setErrImgList([]);
  }

  const onErrorImg = async (e, tokenUri) => {
    const index = e.target.alt
    await getImgURL(tokenUri, index)
    .then(async()=> {
      e.target.src = await errImgList[index]
    })
    .catch(err => console.log(err))
  }

  //json파일이여서 image를 파싱해야할 경우 실행
  const getImgURL = async(tokenUri,index) => {
    let metadata_url = await classify(tokenUri);
    await axios.post('http://localhost:4000/metadata',{
      metadata_url,
    })
    .then((res)=> {

    let result = {};
    result[index] =  classify(res.data);
    setErrImgList({...errImgList,...result});
    }).catch(err => console.log(err));
  }

  const getNFTInfo = async(EOA) => {
    if(EOA) {
      await axios.get(`http://localhost:4000/support/nft/${EOA}`)
      .then((res)=> {
        console.log(res.data);
        setNFTList(res.data);
      }).catch((err)=> {
          console.log(err);
      })}
    else {
    }
  }

  useEffect(async() => {
    const EOA = await getAccount();
    setAccount(EOA);
    await getNFTInfo(EOA);
  },[])


  return(
    <div id ="supNFT">
      <div id="supNFT-title">
        <h2>NFT 기부</h2>
        <div>여러분께 기부 받은 NFT의 판매금액은 후원금액으로 사용됩니다.</div>
      </div>
      <div id="supNFT-contents">
        { NFTList === null ? 
          <h1>No NFT to display</h1>
          :
          NFTList.map((NFT,idx) => {
            return <Card NFT={NFT} idx={idx} key={idx} onErrorImg={onErrorImg} action={donation} text={"Support"}/>  /*  */
          })
        }
      </div>
    </div>
  );
}

export default SupportNFT;