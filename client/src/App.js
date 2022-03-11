import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/reset.css';

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Campaign from "./pages/Campaign";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Nft from "./pages/Nft";
import SupportCoin from "./pages/SupportCoin";
import SupportNFT from "./pages/SupportNFT";

function App() {
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
            <Route path="/nft/*" element={<Nft />} />
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
