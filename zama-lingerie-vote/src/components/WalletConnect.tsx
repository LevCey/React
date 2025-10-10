import { useState } from 'react'
import './WalletConnect.css'

function WalletConnect() {
  // useState: Wallet adresini saklamak için
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)

  // MetaMask'e bağlanma fonksiyonu
  const connectWallet = async () => {
    // MetaMask var mı kontrol et
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask yüklü değil! Lütfen MetaMask kurun.')
      return
    }

    try {
      setIsConnecting(true)
      
      // MetaMask'ten hesap iste
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      // İlk hesabı al
      setAccount(accounts[0])
      
      console.log('Bağlandı:', accounts[0])
    } catch (error) {
      console.error('Bağlantı hatası:', error)
      alert('Cüzdan bağlanamadı!')
    } finally {
      setIsConnecting(false)
    }
  }

  // Cüzdan bağlıysa adresi göster, değilse butonu göster
  return (
    <div className="wallet-connect">
      {account ? (
        <div className="wallet-info">
          <span className="connected-badge">🟢 Bağlı</span>
          <span className="wallet-address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="connect-button"
        >
          {isConnecting ? 'Bağlanıyor...' : '🦊 Connect Wallet'}
        </button>
      )}
    </div>
  )
}

export default WalletConnect