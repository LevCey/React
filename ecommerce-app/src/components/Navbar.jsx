import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../store/slices/cartSlice'

function Navbar() {
  // Redux store'dan veri çek
  const itemCount = useSelector(selectCartItemCount)
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          🛒 E-Shop
        </Link>
        
        <ul className="nav-menu">
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/products">Ürünler</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              🛒 Sepet <span className="cart-badge">{itemCount}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar