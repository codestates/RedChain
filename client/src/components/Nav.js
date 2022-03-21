import { Link } from "react-router-dom";
import React,{useRef, useState} from "react";
import "../styles/App.css"
import img_logo from "../assets/redChain.png"
import img_wallet from "../assets/wallet.png"
import {getAccount} from "../Klaytn/KIP17"


function Nav() {
  const menuList = useRef(null);
  
  const dropdownChek = () => {
    if(menuList.current.style.display === "block") {
      menuList.current.style.display = "none";
    } else {
      menuList.current.style.display = "block";
    }
    console.log("menuList: "+menuList.current.style.display);
  }

  
  return(
    <div id="nav">
      <div id="nav-title">
        <Link to ="/" >
          <img src={img_logo} className="nav-title__picture" />
          <span className="nav-title__name">Red Chain</span>
        </Link>
      </div>
      <div id="nav__menu">
        <Link to="/campaign" className="navTit">Campaign</Link>
        <Link to="/nft/auction" className="navTit">Auction</Link>
        <Link to="/nft/seal" className="navTit">Seal</Link>
        <Link to="/mypage" className="navTit">Mypage</Link>
      </div>
      <div id="nav__support" className="dropdown">
        <button type="button" className="dropdown__toggle" onClick={dropdownChek}>Support ▾</button>
        <ul ref={menuList} className="dropdown__menu" >
          <li className="dropdown__item">
            <Link to="/support/coin" >
              <button type="button" className="dropdown__option" onClick={dropdownChek}>Coin</button>
            </Link>
          </li>
          <li className="dropdown__item">
            <Link to="/support/NFT" >
              <button type="button" className="dropdown__option" onClick={dropdownChek}>NFT</button>
            </Link>
          </li>
        </ul>
        </div>
      <div className="nav__wallet">
        <img src={img_wallet} onClick={getAccount}/>
      </div>
    </div>
  )
}

export default Nav;