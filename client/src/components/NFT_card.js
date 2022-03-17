import "../styles/SupportNFT.css"

const Card = ({nft, action, text}) => {
  return (
    <div className="card">
      <div className="card__img">
        <img src={nft.img} />
      </div>
      <div className="card__content">
        <div className="card__name">{nft.title}</div>
        {/* <div className="card__description"></div> */}
        <button type="button" onClick ={action()}>{text}</button>
      </div>
    </div>
  )
}

export default Card;