import { useState } from 'react'
import './App.css'
import WalletConnect from './components/WalletConnect'
import ProductCard from './components/ProductCard'

// Örnek ürünler (şimdilik placeholder resimler)
const products = [
  {
    id: 1,
    name: 'Elegant Lace Set',
    image: 'https://via.placeholder.com/300x300/ff6b9d/ffffff?text=Design+1',
    description: 'Delicate lace design with floral patterns'
  },
  {
    id: 2,
    name: 'Satin Comfort',
    image: 'https://via.placeholder.com/300x300/c06c84/ffffff?text=Design+2',
    description: 'Smooth satin fabric for ultimate comfort'
  },
  {
    id: 3,
    name: 'Classic Cotton',
    image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Design+3',
    description: 'Breathable cotton blend for everyday wear'
  },
  {
    id: 4,
    name: 'Modern Mesh',
    image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Design+4',
    description: 'Contemporary mesh design with strategic coverage'
  }
]

function App() {
  const handleVote = async (productId: number) => {
    console.log('Voting for product:', productId)
    // Şimdilik sadece log, sonra smart contract ekleyeceğiz
    
    // Simüle edilmiş bekleme (gerçek blockchain transaction gibi)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert(`Private vote cast for Product ${productId}! ✅`)
  }

  return (
    <div className="App">
      <header>
        <h1>🩱 Lingerie Privacy Vote</h1>
        <p>Vote for your favorite designs with complete privacy using Zama FHE</p>
      </header>

      <WalletConnect />

      <main className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            description={product.description}
            onVote={handleVote}
          />
        ))}
      </main>
    </div>
  )
}

export default App