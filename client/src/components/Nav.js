import { Link } from "react-router-dom";
import React from "react";
import img_logo from "../assets/redChain.png"
import img_wallet from "../assets/wallet.png"
import getAccount from "./getAccount";


function Nav() {
  return(
    <div id="nav">
      <div id="nav__title">
        <Link to ="/" >
          <img src={img_logo} width={"55px"} height={"45px"}/>
          <span className="nav__tittle__name">Red Chain</span>
        </Link>
      </div>
      <div id="nav__menu">
        <Link to="/campaign" className="navTit">Campaign</Link>
        <Link to="/nft" className="navTit">NFT</Link>
        <Link to="/mypage" className="navTit">Mypage</Link>
      </div>
      <div id="nav__support">
        <Link to="/support/coin" className="navTit">SupportCoin</Link> 
        <Link to="/support/NFT" className="navTit">SupportNFT</Link>
      </div>
      <div className="nav__wallet">
        <img src={img_wallet} onClick={()=>{getAccount()}}/>
      </div>
    </div>
  )
}

export default Nav;