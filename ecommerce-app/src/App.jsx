import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} /> {/* Bu satırı ekleyin */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App