import { Link } from "react-router-dom";
import React,{useEffect, useRef, useState} from "react";
import "../styles/App.css"
import img_logo from "../assets/redChain.png"
import img_wallet from "../assets/wallet.png"


function Nav() {
  const menuList = useRef(null);
  const [button, setButton] = useState(true);
  
  const dropdownChek = () => {
    if(menuList.current.style.display === "block") {
      menuList.current.style.display = "none";
    } else {
      menuList.current.style.display = "block";
    }
    console.log("menuList: "+menuList.current.style.display);
  }

  const showButton = () => {
    if (window.innerWidth <= 950) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  
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
        <Link to="/nft/seal" className="navTit">Random Box</Link>
      </div>
      {button &&
        <>
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
            <Link to="/mypage">
              <img src={img_wallet}/>
            </Link>
          </div>
        </>
      }
    </div>
  )
}

export default Nav;