import {products} from '../data/products';
import {useCart} from '../context/CartContext';
import {Link} from 'react-router-dom';

function Products() {
    const {addToCart, cart} = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);

        // Opsiyonel: Kullanıcıya ürünün sepete eklendiğini bildirmek için bir bildirim gösterebilirsiniz
        alert(`${product.name} sepete eklendi!`);
    }

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    }
    

    return (
        <div className="products-page"> 
            <h1>Ürünlerimiz</h1>
            <div className='products-grid'>
                {products.map(product => (
                    <div key={product.id}  className='product-card'>
                        <Link to={`/products/${product.id}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <h3>{product.name}</h3>
                        <p className='category'>{product.category}</p>
                        <p className='price'>{product.price} ₺</p>
                        <button className='btn-primary' onClick={() => handleAddToCart(product)}>{isInCart(product.id) ? '✓ Sepette' : 'Sepete Ekle'}</button>
                    </div>           
                ))}
            </div>
        </div>    

    )
}

export default Products