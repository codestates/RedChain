import "../styles/SupportNFT.css"

const Card = ({NFT, idx, onErrorImg, donation}) => {

  const support = () => {
    donation(NFT.contractAddress, NFT.tokenId);
  }

  return (
    <div className="card">
      <div className="card__img">
        <img onError={(e) => onErrorImg(e, NFT.tokenUri)}
             src={NFT.tokenUri}
             alt={idx}/>
      </div>
      <div className="card__content">
        <div className="card__name">{NFT.contractAddress}</div>
        {/* <div className="card__description"></div> */}
        <button type="button" onClick ={support}>Support</button>
      </div>
    </div>
  )
}

export default Card;