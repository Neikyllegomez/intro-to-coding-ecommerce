import { Link } from "react-router-dom";

export function Home() {
    return (
        <section className="home-hero-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="hero-content">
                            <h1 className="hero-title co">Welcome to our store</h1>
                            <p className="hero-text">Discover a world of convenience and variety at ShopWithEase,
                                 where your shopping experience is our top priority. 
                                 Whether you're looking for the latest fashion trends, cutting-edge electronics, or everyday essentials, we've got you covered..</p>
                            
                            <Link   to="/store" className="btn  btn-shop-now">Shop Now</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        
                    </div>
                </div>
            </div>
        </section>

    )
}