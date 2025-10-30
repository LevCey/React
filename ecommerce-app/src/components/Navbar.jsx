import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
        <div className="nav-container">
            <Link to="/" className="logo">
               🛒 E-Shop
            </Link>

            <ul className="nav-links">
                <li>
                    <Link to="/">Ana Sayfa</Link>
                </li>
                <li>
                    <Link to="/products">Ürünler</Link>
                </li>
                <li>
                    <Link to="/cart" className="cart-link">
                    🛒 Sepet <span className="cart-badge">0</span>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;