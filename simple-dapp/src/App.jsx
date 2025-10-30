import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import TransferETH from './components/TransferETH'
import './App.css'

function App() {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const SEPOLIA_CHAIN_ID = '0xaa36a7'
  const SEPOLIA_CHAIN_ID_DECIMAL = 11155111

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null)
      setBalance(null)
      setError('Lütfen MetaMask\'ta hesap bağlayın')
    } else if (accounts[0] !== account) {
      setAccount(accounts[0])
      getBalance(accounts[0])
    }
  }

  const handleChainChanged = (chainId) => {
    setChainId(chainId)
    checkNetwork(chainId)
    window.location.reload()
  }

  const checkNetwork = (currentChainId) => {
    const correct = currentChainId === SEPOLIA_CHAIN_ID
    setIsCorrectNetwork(correct)
    if (!correct) {
      setError(`Lütfen Sepolia test ağına geçin! Şu an: ${parseInt(currentChainId, 16)}`)
    } else {
      setError(null)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask yüklü değil! Lütfen yükleyin: https://metamask.io/')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })

      const currentChainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      })

      setAccount(accounts[0])
      setChainId(currentChainId)
      checkNetwork(currentChainId)

      await getBalance(accounts[0])

      setLoading(false)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }

  const getBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(address)
      const balanceInEth = ethers.formatEther(balance)
      setBalance(balanceInEth)
    } catch (err) {
      console.error('Bakiye alınamadı:', err)
      setError('Bakiye alınamadı')
    }
  }

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      })
    } catch (err) {
      if (err.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          })
        } catch (addError) {
          setError('Sepolia ağı eklenemedi')
        }
      } else {
        setError('Network değiştirilemedi')
      }
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setBalance(null)
    setChainId(null)
    setIsCorrectNetwork(false)
    setError(null)
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Transfer başarılı olduğunda bakiyeyi güncelle
  const handleTransferSuccess = () => {
    if (account) {
      getBalance(account)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔗 Simple DApp</h1>
        <p>Ethereum Sepolia Testnet</p>
      </header>

      <div className="container">
        <div className="wallet-section">
          {!account ? (
            <>
              <h2>Wallet Connection</h2>
              <p>MetaMask ile Sepolia test ağına bağlanın</p>
              <button 
                className="btn-connect" 
                onClick={connectWallet}
                disabled={loading}
              >
                {loading ? 'Bağlanıyor...' : '🦊 Connect MetaMask'}
              </button>
            </>
          ) : (
            <>
              <h2>✅ Wallet Bağlı</h2>
              
              <div className="wallet-info">
                <div className="info-row">
                  <span className="info-label">Adres:</span>
                  <span className="info-value">{formatAddress(account)}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Tam Adres:</span>
                  <span className="info-value" style={{fontSize: '0.85rem'}}>
                    {account}
                  </span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Bakiye:</span>
                  <span className="info-value">
                    {balance ? `${parseFloat(balance).toFixed(4)} ETH` : 'Yükleniyor...'}
                  </span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Network:</span>
                  <span className={`network-badge ${isCorrectNetwork ? 'correct' : 'wrong'}`}>
                    {isCorrectNetwork ? '✓ Sepolia' : `❌ Yanlış Ağ (${parseInt(chainId, 16)})`}
                  </span>
                </div>
              </div>

              {!isCorrectNetwork && (
                <button className="btn-connect" onClick={switchToSepolia} style={{marginTop: '1rem'}}>
                  Sepolia'ya Geç
                </button>
              )}

              <button className="btn-secondary" onClick={disconnectWallet}>
                Bağlantıyı Kes
              </button>
            </>
          )}

          {error && (
            <div className="error">
              ⚠️ {error}
            </div>
          )}

          {!window.ethereum && (
            <div className="error" style={{marginTop: '2rem'}}>
              <h3>MetaMask Bulunamadı!</h3>
              <p>Lütfen MetaMask eklentisini yükleyin:</p>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{color: '#721c24', textDecoration: 'underline'}}
              >
                MetaMask İndir
              </a>
            </div>
          )}
        </div>

        {/* Transfer komponenti - sadece bağlıysa ve doğru networkdeyse göster */}
        {account && isCorrectNetwork && (
          <TransferETH 
            account={account} 
            onSuccess={handleTransferSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default App