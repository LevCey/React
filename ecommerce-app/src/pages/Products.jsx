import {products} from '../data/products';

function Products() {
    return (
        <div className="products-page"> 
            <h1>Ürünlerimiz</h1>
            <div className='products-grid'>
                {products.map(product => (
                    <div key={product.id}  className='product-card'>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className='price'>{product.price} ₺</p>
                        <button className='btn-primary'>Sepete Ekle</button>
                    </div>           
                ))}
            </div>
        </div>    

    )
}

export default Products