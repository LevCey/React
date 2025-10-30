import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Sepolia Testnet Chain ID
  const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Hexadecimal for 11155111

  return (
    <div className="app">
      <header className="header">
        <h1>Simple DApp</h1>
        <p>Ethereum Sepolia Testnet</p>
      </header>

      <div className="container">
        <div className="wallet-selection">
          <h2>Wallet Connection</h2>
          <p>Metamask ile bağlanın</p>,
          <button className="btn-connect">Connect Wallet</button>  
        </div>  
      </div>
    </div>
  );
}

export default App;