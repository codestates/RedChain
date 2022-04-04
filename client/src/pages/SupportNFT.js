import {React, useState, useEffect} from "react";
import "../styles/SupportNFT.css"
import Card from "../components/NFT_card";
import axios from "axios";
import {getAccount, classify} from "../Klaytn/util"
import Caver from 'caver-js';
import KIP17ABI from '../Klaytn/KIP17ABI'

function SupportNFT() {
  const [account, setAccount] = useState(null);
  const [NFTList, setNFTList] = useState([]);
  const [errImgList, setErrImgList] = useState({});

  const donation = async (CA, tokenId, tokenURI) => {
    const token = tokenId.slice(2);
    const to = '0x05f59eEb87556A66654E9D6cb58d59f5a69aB5c0'
    // const to = '0x3d7a899250aDBaA826A45603da5240f1ca12C88F'

    await window.klaytn._kaikas.isApproved()
    .then(async(res) => {
      if(res) {
        const caver = new Caver(window.klaytn);
        const myContract = new caver.klay.Contract(KIP17ABI, CA);
        const from = (window.klaytn.selectedAddress);
        await myContract.methods.safeTransferFrom(from, to, token)
          .send({
            from,
            gas: 300000,
          })
          .then(() => {
            const refreshNFTList = NFTList.filter((nft,index)=> (nft.contractAddress !== CA && nft.tokenId !== tokenId)); 
            setNFTList(refreshNFTList);
            setErrImgList([]);
            recordDB(CA, token, tokenURI);
          })
          .catch(err => console.log(err));
       }
    })
  }

  const recordDB = async(tokenAddress, tokenId, tokenURI) => {
    await axios.post("http://localhost:4000/support/nft", {
      tokenAddress,
      tokenId,
      tokenURI,
      contributor: account,
      }).catch(err => console.log(err));
  }

  //json파일이여서 이미지가 안뜨면 getImgURL을 실행
  const onErrorImg = async (e, tokenUri) => {
    const index = e.target.alt;
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
      <div className="banner">
        <h1>NFT 기부</h1>
      </div>
      <div id="supNFT-contents">
        { NFTList === null ? 
          <h1>No NFT to display</h1>
          :
          NFTList.map((NFT,idx) => {
            return <Card NFT={NFT} idx={idx} key={idx} onErrorImg={onErrorImg} donation={donation} text={"Support"}/>  /*  */
          })
        }
      </div>
    </div>
  );
}

export default SupportNFT;