// NFT 더미. --> tokenId, tittle, img, description
// NFT 경매!! -> 오픈날짜, 종료날짜, 응찰자주소, 현재응찰가 
// 진행여부(예정,진행,종료)는 오픈 및 종료일자로 확인 가능하다.
// 생성일을 알면 종료일도 알 수 있지 않나???
const dummyNFT = [
  {
    tokenId : 1,
    title : "name_1",
    img : "https://source.unsplash.com/featured/?mountain",
    description : "아름다운 산과 물_1",
    create_at : "2022-03-01",
    end_at : "2022-03-15",
    bidder_address : "address_1",
    bid_price : "1",
  },{
    tokenId : 2,
    title : "name_2",
    img : "https://source.unsplash.com/featured/?water",
    description : "아름다운 산과 물_2",
    create_at : "2022-03-05",
    end_at : "2022-03-19",
    bidder_address : "address_2",
    bid_price : "2",
  },{
    tokenId : 3,
    title : "name_3",
    img : "https://source.unsplash.com/featured/?water,mountain",
    description : "아름다운 산과 물_3",
    create_at : "2022-03-09",
    end_at : "2022-03-23",
    bidder_address : "address_3",
    bid_price : "3",
  },{
    tokenId : 4,
    title : "name_4",
    img : "https://source.unsplash.com/featured/?book",
    description : "아름다운 산과 물_4",
    create_at : "2022-03-10",
    end_at : "2022-03-24",
    bidder_address : "address_4",
    bid_price : "4",
  },{
    tokenId : 5,
    title : "name_4",
    img : "https://source.unsplash.com/featured/?mango",
    description : "아름다운 산과 물_5",
    create_at : "2022-03-12",
    end_at : "2022-03-26",
    bidder_address : "address_5",
    bid_price : "5",
  },{
    tokenId : 6,
    title : "name_6",
    img : "https://source.unsplash.com/featured/?fish",
    description : "아름다운 산과 물_6",
    create_at : "2022-03-15",
    end_at : "2022-03-29",
    bidder_address : "address_6",
    bid_price : "6",
  }
]

export default dummyNFT;