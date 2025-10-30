import { useState } from 'react'
import { ethers } from 'ethers'
import './TransferETH.css'

function TransferETH({ account, onSuccess }) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [txHash, setTxHash] = useState(null)

  const handleTransfer = async (e) => {
    e.preventDefault()
    
    if (!recipient || !amount) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setTxHash(null)

      // Provider ve Signer al
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Transaction gönder
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount)
      })

      setTxHash(tx.hash)

      // Transaction'ın onaylanmasını bekle
      await tx.wait()

      setLoading(false)
      setRecipient('')
      setAmount('')
      
      if (onSuccess) {
        onSuccess()
      }

    } catch (err) {
      console.error('Transfer hatası:', err)
      setError(err.message || 'Transfer başarısız')
      setLoading(false)
    }
  }

  return (
    <div className="transfer-section">
      <h2>💸 ETH Transfer</h2>
      <p className="transfer-desc">Sepolia test ağında ETH gönderin</p>

      <form onSubmit={handleTransfer} className="transfer-form">
        <div className="form-group">
          <label>Alıcı Adres:</label>
          <input
            type="text"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Miktar (ETH):</label>
          <input
            type="number"
            step="0.001"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-transfer"
          disabled={loading || !recipient || !amount}
        >
          {loading ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>

      {txHash && (
        <div className="success">
          <p>✅ Transfer başarılı!</p>
          <p style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
            TX Hash: <code>{txHash.slice(0, 10)}...{txHash.slice(-8)}</code>
          </p>
          
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="explorer-link"
          >
            Etherscan'de Görüntüle →
          </a>
        </div>
      )}

      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}

      <div className="transfer-tips">
        <h4>💡 İpuçları:</h4>
        <ul>
          <li>Test ETH almak için: <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer">Sepolia Faucet</a></li>
          <li>Kendi adresinize de gönderebilirsiniz (test için)</li>
          <li>Gas fee otomatik hesaplanır</li>
        </ul>
      </div>
    </div>
  )
}

export default TransferETH