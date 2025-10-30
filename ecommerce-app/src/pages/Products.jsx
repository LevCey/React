import { useState } from 'react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

function Products() {
  const { addToCart, cart } = useCart()
  
  // Custom hook kullanımı - seçilen kategori localStorage'da saklanır
  const [selectedCategory, setSelectedCategory] = useLocalStorage('selectedCategory', 'Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddToCart = (product) => {
    addToCart(product)
    alert(`${product.name} sepete eklendi! 🎉`)
  }

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId)
  }

  // Kategorileri al
  const categories = ['Tümü', ...new Set(products.map(p => p.category))]

  // Filtreleme
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="products-page">
      <h1>Ürünlerimiz</h1>

      {/* Filtreler */}
      <div className="filters">
        <div className="search-box">
          <input 
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sonuç sayısı */}
      <p className="results-count">
        {filteredProducts.length} ürün bulundu
      </p>

      {/* Ürünler */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">{product.price} ₺</p>
              <button 
                className={`btn-primary ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={() => handleAddToCart(product)}
              >
                {isInCart(product.id) ? '✓ Sepette' : 'Sepete Ekle'}
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Aradığınız kriterlere uygun ürün bulunamadı 😕</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products