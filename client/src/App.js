import {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { classify } from "./Klaytn/util";
import './styles/App.css';
import './styles/reset.css';


import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Campaign from "./pages/Campaign";
import Campaign_Detail from "./pages/Campaign_Detail";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import NftAuction from "./pages/NftAuction";
import NftSeal from "./pages/NftSeal";
import SupportCoin from "./pages/SupportCoin";
import SupportNFT from "./pages/SupportNFT";
import NftAuctionView from "./pages/NftAuctionView";
import NftSealView from "./pages/NftSealView";


function App() {

  const [errImgList, setErrImgList] = useState({});
  const [auctionList, setAuctionList] = useState([]);  // 홈페이지에 기부받은 nft 리스트

  const getAuctionList = async () => {
    await axios.get('http://localhost:4000/auction')
    .then(async(res) => {
      for(let i = 0; i< res.data.length; i++) {
        const tokenURI = classify(res.data[i].tokenURI);
        res.data[i].tokenURI = tokenURI;
        if(res.data[i].highestBid === null) {
          res.data[i].highestBid = 0;
        }
      }
      console.log(res.data);
      setAuctionList(res.data);
    }).catch(err => console.log(err));
  }


  return (
    <Router>
      <nav>
        <Nav />
      </nav>
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/campaign/*" element={<Campaign />} />
            <Route path="/campaign/detail/:id" element={<Campaign_Detail/>}/>
            <Route path="/nft/auction" element={<NftAuction getAuctionList={getAuctionList} auctionList={auctionList}/>} />
            <Route path="/nft/auction/:id" element={<NftAuctionView auctionList={auctionList}/>} />
            <Route path="/nft/seal" element={<NftSeal />} />
            <Route path="/nft/Seal/:id" element={<NftSealView />} />
            <Route path="/mypage/" element={<Mypage />} /> 
            <Route path="/support/coin" element={<SupportCoin />} />
            <Route path="/support/NFT" element={<SupportNFT />} />
          </Routes>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
