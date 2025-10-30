import { useDispatch, useSelector } from 'react-redux'
import { 
  selectCartItems, 
  selectCartTotal,
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from '../store/slices/cartSlice'
import { Link } from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Sepetiniz Boş 🛒</h2>
        <p>Hemen alışverişe başlayın!</p>
        <Link to="/products" className="btn-primary">
          Ürünlere Git
        </Link>
      </div>
    )
  }

  const handleClearCart = () => {
    if (window.confirm('Sepeti temizlemek istediğinizden emin misiniz?')) {
      dispatch(clearCart())
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Sepetim</h1>
        <button className="btn-clear" onClick={handleClearCart}>
          Sepeti Temizle
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price} ₺</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div>
              <div className="item-total">
                {item.price * item.quantity} ₺
              </div>
              <button 
                className="btn-remove"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Sipariş Özeti</h2>
          <div className="summary-row">
            <span>Ürün Sayısı:</span>
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="summary-row">
            <span>Ara Toplam:</span>
            <span>{total} ₺</span>
          </div>
          <div className="summary-row total">
            <span>Toplam:</span>
            <span>{total} ₺</span>
          </div>
          <button className="btn-checkout">
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart