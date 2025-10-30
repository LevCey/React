import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts, selectProductsLoading, selectProductsError } from '../store/slices/productsSlice'
import { addToCart, selectCartItems } from '../store/slices/cartSlice'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

function Products() {
  const dispatch = useDispatch()
  
  // Redux state
  const products = useSelector(selectAllProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const cartItems = useSelector(selectCartItems)
  
  const [selectedCategory, setSelectedCategory] = useLocalStorage('selectedCategory', 'Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  // Component mount olduğunda ürünleri yükle
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = (product) => {
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

  // Loading durumu
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Ürünler yükleniyor...</p>
      </div>
    )
  }

  // Error durumu
  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Hata!</h2>
        <p>{error}</p>
        <button className="btn-primary" onClick={() => dispatch(fetchProducts())}>
          Tekrar Dene
        </button>
      </div>
    )
  }

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