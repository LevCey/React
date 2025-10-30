import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {
  const { 
    cart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart, 
    getTotal 
  } = useCart()

  if (cart.length === 0) {
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

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Sepetim</h1>
        <button className="btn-clear" onClick={clearCart}>
          Sepeti Temizle
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price} ₺</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <div className="item-total">
                {item.price * item.quantity} ₺
              </div>
              <button 
                className="btn-remove"
                onClick={() => removeFromCart(item.id)}
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
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="summary-row">
            <span>Ara Toplam:</span>
            <span>{getTotal()} ₺</span>
          </div>
          <div className="summary-row total">
            <span>Toplam:</span>
            <span>{getTotal()} ₺</span>
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