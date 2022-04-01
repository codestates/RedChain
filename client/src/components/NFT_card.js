import { Link } from "react-router-dom";
import "../styles/SupportNFT.css"


const Card = ({NFT, idx, onErrorImg, img, quantity, donation, text}) => {

  const support = () => { 
    donation(NFT.contractAddress, NFT.tokenId, NFT.tokenUri) ;
  }

  if(text === "Support") {  // NFT 기부페이지라면 이걸 리턴.
    return (
      <div className="card">
          <div className="card__img">
            <img onError={(e) => onErrorImg(e, NFT.tokenUri)}
                src={NFT.tokenUri}
                alt={idx}/>
          </div>
          <div className="card__content">
              <button type="button" className="card__button" onClick ={support}>{text}</button>
          </div>
        </div>
    )
  } else if(text === "/nft/auction/") {   // auction 페이지면 이걸 리턴
    return (
      <div className="card" >
        <Link to={{pathname:`${text}${NFT.id}`}} >
          <div className="card__img">
            {/* <img onError={(e) => onErrorImg(e, NFT.tokenUri)}
                src={NFT.tokenUri}
                alt={idx}/> */}
            <img src={NFT.tokenURI} alt="" />
          </div>
          <div className="card__content">
            {/* <div className="card_contributor">후원자 {NFT.contributor}</div> */}
            <div className="card__price">최고 응찰가 : {NFT.highestBid}  KLAY</div>
            <div className="card__endAt">종료일 : {NFT.endAt}</div>
          </div>
        </Link>
      </div>
    )
  }  else if(text === "/nft/seal/") {   // auction 페이지면 이걸 리턴
    return (
      <div className="card" >
        <Link to={{pathname:`${text}${NFT.tokenId}`}} >
          <div className="card__img">
          
            <img src={img} alt="" />
          </div>
          <div className="card__content">
            <div className="card__price">발행량 : {quantity} 개</div>
          </div>
        </Link>
      </div>
    )
  } 
  else {
    return (
      <div className="card" >
        <Link to={{pathname:`${text}${NFT.tokenId}`}} >
          <div className="card__img">
            {/* <img onError={(e) => onErrorImg(e, NFT.tokenUri)}
                src={NFT.tokenUri}
                alt={idx}/> */}
            <img src={onErrorImg} alt="" />
          </div>
          <div className="card__content">
            <div className="card__price">판매가 : {NFT.bid_price}  KLAY</div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Card;