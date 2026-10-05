import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <h2 className="center">Loading products...</h2>;
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to MiniShop</h1>
        <p>
          Simple MERN Microservices E-Commerce
        </p>
      </section>

      <h2>Products</h2>

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;