import { Link } from "react-router-dom";
import { useCart} from "../context/CartContext";

function Navbar() {
  const { getItemCount } = useCart();

  return (
    <nav className="navbar">
        <div className="nav-container">
            <Link to="/" className="logo">
               🛒 E-Shop
            </Link>
            <ul className="nav-links">
                <li><Link to="/">Ana Sayfa</Link></li>
                <li><Link to="/products">Ürünler</Link></li>
                <li>
                    <Link to="/cart" className="cart-link">
                        🛒 Sepet <span className="cart-badge">{getItemCount()}</span>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;