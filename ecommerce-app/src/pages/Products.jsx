import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { products } from '../data/products'
import { addToCart, selectCartItems } from '../store/slices/cartSlice'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

function Products() {
  // Redux hooks
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  
  const [selectedCategory, setSelectedCategory] = useLocalStorage('selectedCategory', 'Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddToCart = (product) => {
    // Redux action dispatch et
    dispatch(addToCart(product))
    alert(`${product.name} sepete eklendi! 🎉`)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  const categories = ['Tümü', ...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="products-page">
      <h1>Ürünlerimiz</h1>

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

      <p className="results-count">
        {filteredProducts.length} ürün bulundu
      </p>

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