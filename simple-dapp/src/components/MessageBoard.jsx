import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { MESSAGE_BOARD_ADDRESS, MESSAGE_BOARD_ABI } from '../contracts/MessageBoard'
import './MessageBoard.css'

function MessageBoard({ account }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [error, setError] = useState(null)
  const [txHash, setTxHash] = useState(null)

  // Mesajları yükle
  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      setLoadingMessages(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = new ethers.Contract(MESSAGE_BOARD_ADDRESS, MESSAGE_BOARD_ABI, provider)
      
      const allMessages = await contract.getAllMessages()
      
      // Mesajları formatla
      const formattedMessages = allMessages.map(msg => ({
        sender: msg.sender,
        content: msg.content,
        timestamp: Number(msg.timestamp)
      }))
      
      // Yeni mesajlar üstte olsun
      setMessages(formattedMessages.reverse())
      setLoadingMessages(false)
    } catch (err) {
      console.error('Mesajlar yüklenemedi:', err)
      setError('Mesajlar yüklenemedi')
      setLoadingMessages(false)
    }
  }

  const postMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim()) {
      setError('Mesaj boş olamaz')
      return
    }

    if (newMessage.length > 280) {
      setError('Mesaj çok uzun (max 280 karakter)')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setTxHash(null)

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(MESSAGE_BOARD_ADDRESS, MESSAGE_BOARD_ABI, signer)

      // Contract fonksiyonunu çağır
      const tx = await contract.postMessage(newMessage)
      setTxHash(tx.hash)

      // Transaction'ın onaylanmasını bekle
      await tx.wait()

      setNewMessage('')
      setLoading(false)

      // Mesajları yeniden yükle
      await loadMessages()

    } catch (err) {
      console.error('Mesaj gönderilemedi:', err)
      setError(err.message || 'Mesaj gönderilemedi')
      setLoading(false)
    }
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString('tr-TR')
  }

  return (
    <div className="message-board-section">
      <h2>📝 Message Board</h2>
      <p className="board-desc">
        Blockchain üzerinde kalıcı mesajlar paylaşın
      </p>

      {/* Mesaj gönderme formu */}
      <form onSubmit={postMessage} className="message-form">
        <textarea
          placeholder="Mesajınızı yazın (max 280 karakter)..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={loading}
          maxLength={280}
          rows={4}
        />
        
        <div className="form-footer">
          <span className="char-count">
            {newMessage.length}/280
          </span>
          <button 
            type="submit" 
            className="btn-post"
            disabled={loading || !newMessage.trim()}
          >
            {loading ? 'Gönderiliyor...' : '📤 Mesaj Gönder'}
          </button>
        </div>
      </form>

      {txHash && (
        <div className="success">
          <p>✅ Mesaj blockchain'e yazıldı!</p>
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

      {/* Mesajlar listesi */}
      <div className="messages-container">
        <div className="messages-header">
          <h3>💬 Tüm Mesajlar ({messages.length})</h3>
          <button 
            className="btn-refresh" 
            onClick={loadMessages}
            disabled={loadingMessages}
          >
            {loadingMessages ? '⏳' : '🔄'} Yenile
          </button>
        </div>

        {loadingMessages ? (
          <div className="loading-messages">
            <p>Mesajlar yükleniyor...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <p>Henüz mesaj yok. İlk mesajı siz gönderin! 🚀</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div key={index} className="message-item">
                <div className="message-header">
                  <span className="message-sender">
                    {msg.sender === account ? '👤 Sen' : formatAddress(msg.sender)}
                  </span>
                  <span className="message-time">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="contract-info">
        <h4>📄 Contract Bilgileri</h4>
        <p>
          <strong>Adres:</strong>{' '}
          <a 
            href={`https://sepolia.etherscan.io/address/${MESSAGE_BOARD_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatAddress(MESSAGE_BOARD_ADDRESS)}
          </a>
        </p>
      </div>
    </div>
  )
}

export default MessageBoard