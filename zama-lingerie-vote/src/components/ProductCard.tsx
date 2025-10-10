import { useState } from 'react'
import './ProductCard.css'

interface ProductCardProps {
  id: number
  name: string
  image: string
  description: string
  onVote: (productId: number) => void
}

function ProductCard({ id, name, image, description, onVote }: ProductCardProps) {
  const [isVoting, setIsVoting] = useState<boolean>(false)

  const handleVote = async () => {
    setIsVoting(true)
    try {
      await onVote(id)
    } catch (error) {
      console.error('Vote error:', error)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <button 
          onClick={handleVote} 
          disabled={isVoting}
          className="vote-button"
        >
          {isVoting ? '🔐 Voting...' : '🗳️ Vote (Private)'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard