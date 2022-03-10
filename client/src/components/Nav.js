import { Link } from "react-router-dom";
import React from "react";
import img_logo from "../assets/redChain.png"
import img_wallet from "../assets/wallet.png"
import getAccount from "./getAccount";


function Nav() {
  return(
    <div id="nav">
      <div id="nav_title">
        <Link to ="/" >
          <img src={img_logo} width={"55px"} height={"45px"}/>
          <span className="nav_tittle_name">Red Chain</span>
        </Link>
      </div>
      <div id="nav_menu">
        <Link to="/Campaign" className="navTit">Campaign</Link>
        <Link to="/Nft" className="navTit">NFT</Link>
        <Link to="/Mypage" className="navTit">Mypage</Link>
        
      </div>
      <div id="nav_support">
        
          <Link to="/Support" className="navTit">Support</Link> 
          <Link to="CreateNFT" className="navTit">CreateNFT</Link>
        </div>
        <span className="nav_wallet">
          <img src={img_wallet} onClick={()=>{getAccount()}}/>
        </span>
      
    </div>
  )

}

export default Nav;