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
import Support from "./pages/Support";
import CreateNFT from "./pages/CreateNFT";

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
            <Route path="/Campaign/*" element={<Campaign />} />
            <Route path="/Nft/*" element={<Nft />} />
            <Route path="/Mypage/*" element={<Mypage />} /> 
            <Route path="/Support/*" element={<Support />} />
            <Route path="/CreateNFT/*" element={<CreateNFT />} />
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
