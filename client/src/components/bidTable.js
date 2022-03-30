import React from "react";
import "../styles/NftAuctionView.css"

function BidTable({list, colNames }) {

   const listup = Object.values(list).filter((el,inx) =>{  // 닉넴있음 주소삭제, 닉넴없으면 닉넴 삭제
    //console.log("el : " + JSON.stringify(el));
    if(el.nickname === '') {
      delete el.nickname;
    }else if(el.nickname){
      delete el.address;
    }
    return el;
  })
  
  
  return(
    <div>
      {list.length > 0 && (
        <table cellSpacing = "0" className="table" >
          <thead className ="table__thead">
            <tr>
              {colNames.map((headerItem, index) => (
                <th key = {index} >
                  {headerItem.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__tbody">
            {Object.values(listup).map((obj, index) => (
              <tr key = {index} className ="table__tr">
                {Object.values(obj).map((value, idx) => (  
                  idx === 0 
                  ? <td key = {idx} className="address" >{value}</td>
                  : <td key = {idx} className="" >{value}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BidTable;