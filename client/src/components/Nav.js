import { Link } from "react-router-dom";
import React from "react";
import "../styles/App.css"
import img_logo from "../assets/redChain.png"
import img_wallet from "../assets/wallet.png"
import getAccount from "./getAccount";

const dropdownBtn = document.querySelector(".dropdown__toggle");
const menuList = document.querySelector(".dropdown__menu");

function Nav() {
  // // dropdownBtn 클릭하면, menuList 나온다
  // dropdownBtn.addEventListener("click", function () {
  //   menuList.classList.toggle("show");
  // });

  // // menuList는 사라진다
  // dropdownBtn.addEventListener("blur", function () {
  //   menuList.classList.remove("show");
  // });


  const dropdownChek = () => {
    if(menuList.style.display === "block") {
      menuList.style.display = "none";
    } else {
      menuList.style.display = "block";
    }
    console.log("menuList: "+menuList.style.display);
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
        <Link to="/nft" className="navTit">NFT</Link>
        <Link to="/mypage" className="navTit">Mypage</Link>
      </div>
      <div id="nav__support" className="dropdown">
        <button type="button" className="dropdown__toggle" onClick={dropdownChek}>Support ▾</button>
        <ul className="dropdown__menu" >
          <li className="dropdown__item">
            <Link to="/support/coin" > {/* className="navTit" */}
              <button type="button" className="dropdown__option" onClick={dropdownChek}>Coin</button>
            </Link>
          </li>
          <li className="dropdown__item">
            <Link to="/support/NFT" >   {/* className="navTit" */}
              <button type="button" className="dropdown__option" onClick={dropdownChek}>NFT</button>
            </Link>
          </li>
        </ul>

      </div>
      <div className="nav__wallet">
        <img src={img_wallet} onClick={()=>{getAccount()}}/>
      </div>
    </div>
  )
}

export default Nav;