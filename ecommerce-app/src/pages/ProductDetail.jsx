import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { products } from '../data/products'
import { addToCart, selectCartItems } from '../store/slices/cartSlice'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="not-found">
        <h2>Ürün Bulunamadı 😕</h2>
        <Link to="/products" className="btn-primary">Ürünlere Dön</Link>
      </div>
    )
  }

  const isInCart = cartItems.some(item => item.id === product.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    navigate('/cart')
  }

  return (
    <div className="product-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Geri
      </button>

      <div className="detail-content">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          
          <div className="detail-price">
            <span className="price-label">Fiyat:</span>
            <span className="price-value">{product.price} ₺</span>
          </div>

          <div className="detail-actions">
            <button 
              className="btn-add-large"
              onClick={handleAddToCart}
            >
              {isInCart ? '✓ Sepete Eklendi - Sepete Git' : 'Sepete Ekle'}
            </button>
          </div>

          <div className="detail-features">
            <h3>Ürün Özellikleri:</h3>
            <ul>
              <li>✓ Ücretsiz Kargo</li>
              <li>✓ 14 Gün İade Garantisi</li>
              <li>✓ 2 Yıl Garanti</li>
              <li>✓ Hızlı Teslimat</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="related-products">
        <h2>Benzer Ürünler</h2>
        <div className="products-grid">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="product-card">
                <Link to={`/product/${relatedProduct.id}`}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </Link>
                <h3>{relatedProduct.name}</h3>
                <p className="price">{relatedProduct.price} ₺</p>
                <Link to={`/product/${relatedProduct.id}`} className="btn-primary">
                  İncele
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail