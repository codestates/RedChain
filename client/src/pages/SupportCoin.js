import React, {useEffect, useState} from "react";
import "../styles/SupportCoin.css";
import redchainLogo from '../assets/redChain.png'
import { getAccount } from "../Klaytn/KIP17";
import Caver from 'caver-js';


function SupportCoin() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [to, setTo] = useState(null);
  const [caver,setCaver] = useState();
  const [receipt, setReceipt ] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const groupList = [
    {value: "0x4acd0f73286AE8688Fcb5A53a0941eE09b6c19AA", name: "유니세프" },
    {value: "구세군지갑주소", name: "구세군" },
    {value: "적십자지갑주소", name: "적십자" },
    {value: "희망의집지갑주소", name: "희망의집" },
  ]

  const getAmount = (e) => {
    setAmount(e.target.value);
  }
  const selectedGroup = (e) => {
    setTo(e.target.value);
  }

  const SupportKlaytn = async() => {
    await checkApporveWallet(); 
    if(balance < amount ) {
      alert("잔액이 부족합니다!");
    }
    else if(!to) {
      alert("후원 할 단체를 선택해 주세요");
    }
    else if(amount <= 0) {
      alert("후원 금액을 다시 확인해 주세요...");
    }
    else {
    const txhash =  await caver.klay.sendTransaction({
        type: 'VALUE_TRANSFER',
        from: account[0],
        to,
        value: caver.utils.toPeb(amount,'KLAY'),
        gas: 21000,
      })
      console.log(txhash);
      setReceipt(txhash.transactionHash);
      setAmount(0);
      setIsCompleted(true);
    }
  }


  const checkApporveWallet = async() => {
    //카이카스가 현재도메인에 캐시된 어프로브가있는지 확인하여 true나 false체크
    //만약 false라면 승인 알람팝업을 띄운다.
    await window.klaytn._kaikas.isApproved()
    .then((result) => {
      if(!result) {
        getAccount();
      }
    }).catch(err=> console.error(err));
  }

  useEffect(async()=> {
    const EOA = await getAccount();
    setAccount(EOA);
    const tempCaver = new Caver(window.klaytn);
    setCaver(tempCaver);
    const searchBalance = await tempCaver.klay.getBalance(EOA[0]);
    const result = tempCaver.utils.convertFromPeb(searchBalance);
    setBalance(result);
    
  },[]);
 
  return (
    <div className="supCoin">
      <section className="supCoin-banner-wrap">
        <div className="supCoin-banner">
            <h1 className="supCoin-title"><strong>후원하기</strong></h1>
        </div>
      </section>
      <div className="supCoin-bot">
        <div className="supCoin-bot-wrap">
          <div className="balanceInfo">
            <h2><strong>1. 계좌잔액</strong></h2>
            <span className="balance">{balance} KLAY</span>
          </div>
          <div className="select-group">
            <h2><strong>2. 후원 할 단체</strong></h2>
            <select className="select-group-src" onChange={selectedGroup} name="group">
              <option value=''>후원 할 단체 선택</option>
              {groupList.map((group,idx) => {
                return <option key={idx} value = {group.value}>{group.name}</option>
              }
              )}
            </select>
          </div>
          <div className="donation">
            <h3><strong>3. 후원 금액(klay)</strong></h3>
            <input type="number" onChange={getAmount} value={amount} min="0"></input>
            <button onClick={SupportKlaytn}>후원하기</button>
          </div>
          {isCompleted ? 
          <div className="receipt">
            <img src={redchainLogo}></img>
            <h2><strong>기부가 완료되었습니다.</strong></h2>
            <h3>따뜻한 마음, 소중히 사용하겠습니다.</h3>
            <span>트랜잭션해시 값: </span>
            <a href="#"
               onClick={() => window.open(`https://baobab.scope.klaytn.com/tx/${receipt}`)}
               target="_blank" 
               rel="noopener noreferrer"
               >{receipt}</a>
          </div>
          : null
          }
        </div>
      </div>
    </div>

    
  );
}

export default SupportCoin;