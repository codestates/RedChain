import Caver from 'caver-js';
import SealABI from './SealABI';
import { sealAddress } from './contracts';
import axios from 'axios';
//kaikas연결

const getAccount = async() => {
    return await window.klaytn.enable();
}

  //피나타나 ipfs일경우 파싱이 느려서 로컬ipfs주소로 변환하거나 개인api라면 그냥 api로 반환
const classify = (url) => {
    let result = 'https://ipfs.io/ipfs/';
    if(url.startsWith('ipfs://')) {
        result += url.slice('ipfs://'.length)
        return result;
    } 
    else if(url.startsWith('https://gateway.pinata.cloud/ipfs/')) {
        result += url.slice('https://gateway.pinata.cloud/ipfs/'.length)
        return result;
    } 
    else {
        return url;
    }
}
const addDays = (date, days) => {
    const today = new Date();
    today.setDate(date.getDate() + days);
    
    const ymd = (today.toISOString().split("T")[0]);
    const hms = (today.toTimeString().split(" ")[0]);
    const result = (ymd + ' ' + hms);

    return (result);
}

//axios주소변경
const sealBuy = async() => {
    await window.klaytn.enable();
    const caver = new Caver(window.klaytn)
    const sealContract = new caver.klay.Contract(SealABI, sealAddress);
    await sealContract.methods.buy().send({
      from: window.klaytn.selectedAddress,
      gas: '50000',
      value: caver.utils.toPeb(20,'KLAY'),
      gasPrice: null,
    }).then(async(tx) => {
      if(tx.value) {
        await axios.post(process.env.REACT_APP_API_URL+'/buy/seal', {
          account : window.klaytn.selectedAddress,
          tokenId : parseInt(tx.events[0].raw.data),
        }).then((res)=> console.log(res));
      }
    }).catch(err => console.log(err));
  }


export {getAccount, classify, addDays, sealBuy}