import React from "react";
import "../styles/NftAuctionView.css"

function BidTable({list, colNames, width = 'auto', height = 'auto' }) {
  return(
    <div /* style = {{ boxShadow: "3px 6px 3px #ccc" }} */ >
      {list.length > 0 && (
        <table cellSpacing = "0" style={{width: "100%", height: height, padding: "5px 10px", margin: "0 auto" }}>
          <thead className ="" style={{ backgroundColor: "gray", margin: "5px 10px", height: "2.5rem"}}>
            <tr>
              {colNames.map((headerItem, index) => (
                <th key = {index} >
                  {headerItem.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(list).map((obj, index) => (
              <tr key = {index}>
                {Object.values(obj).map((value, index2,obj) => (  // nick이 있다면 주소X, nick이 없다면 주소O
                  index2 === 1 
                  ? <td key = {index2} className="address" >{value}</td>
                  : <td key = {index2} className="" >{value}</td>


                  // if(idx === 0 && value === null) {  // index=0, nick 없다면
                    
                  // } else if(idx === 1 && acc === 0) {  // index=1, nick 있다면
                    
                  // }else if(idx === 0 && idx === 1)  {// 위 두 경우에 해당되지 않는 index 1,2 
                  //   <td key = {idx} className="address" >{value}</td>
                    
                  // }else {
                  //   <td key = {idx} className="" >{value}</td>
                    
                  // }
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