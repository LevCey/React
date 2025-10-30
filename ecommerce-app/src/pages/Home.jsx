import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <div className="hero">
                <h1>Mini E-ticaret Mağazamıza Hoşgeldiniz! 🎉</h1>
                <p>Kaliteli Ürünler, Uygun Fiyatlar</p>
                <Link to="/products" className="btn-primary">
                    Alışverişe Başla
                </Link>
            </div>
        </div>
    );
}

export default Home;