import { Link } from "react-router-dom";
import "../styles/SupportNFT.css"


const Card = ({NFT, idx, onErrorImg, action, text}) => {

  const donation = () => { action(NFT.contractAddress, NFT.tokenId); }
  const move = () => { action(NFT.tokenId); }

  if(text === "Support") {  // NFT 기부페이지라면 이걸 리턴.
    return (
      <div className="card">
          <div className="card__img">
            <img onError={(e) => onErrorImg(e, NFT.tokenUri)}
                src={NFT.tokenUri}
                alt={idx}/>
          </div>
          <div className="card__content">
              <button type="button" className="card__button" onClick ={donation}>{text}</button>
          </div>
        </div>
    )
  } else {   // NFT 기부 페이지가 아니라면 이걸 리턴
    return (
      <div className="card" >
        <Link to={{pathname:`${text}${NFT.tokenId}`, state: {NFT: NFT}}} >
          <div className="card__img">
            {/* <img onError={(e) => onErrorImg(e, NFT.tokenUri)}
                src={NFT.tokenUri}
                alt={idx}/> */}
            <img src={onErrorImg} alt="" />
          </div>
          <div className="card__content">
            <div className="card__price">price : </div>
            <div className="card__creatAt">creatAt : </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Card;