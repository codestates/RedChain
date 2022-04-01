import React from "react";
import "../styles/Mypage.css"

function Mypage() {
  return(
    <div className="mypage-menu">
      <input type="radio" id="tab-1" name="show" checked/>
      <input type="radio" id="tab-2" name="show" />
      <div class="tab">
        <label for="tab-1">Profile</label>
        <label for="tab-2">기부 내역</label>
      </div>
      <div class="content">
        <div class="content-dis">
        Profile 내용
        </div>
        <div class="content-dis">
        기부 내역 내용
        </div>
      </div>
      {/* <button className="mypage-menu__button" type="button">Profile</button>
      <button className="mypage-menu__button" type="button">기부내역</button> */}
    </div>
  );
}

export default Mypage;