import React from "react";
import "../styles/NftAuctionView.css"

function BidTable({list }) {
  const colNames = ['응찰자', '주소', '응찰가격', '응찰날짜'];
  
  return(
    <div>
      {true && (
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
            {Object.values(list).map((obj, index) => (
              <tr key = {index} className ="table__tr">
                {Object.values(obj).map((value, idx) => (  // nick이 있다면 주소X, nick이 없다면 주소O
                  idx === 1 
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