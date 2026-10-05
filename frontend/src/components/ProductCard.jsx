import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
          />
        ) : (
          <div className="placeholder">
            No Image
          </div>
        )}
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="category">
          {product.category}
        </p>

        <p className="description">
          {product.description}
        </p>

        <div className="product-footer">
          <strong>
            ৳{product.price.toLocaleString()}
          </strong>

          <Link
            to={`/products/${product._id}`}
            className="button"
          >
            View
          </Link>
        </div>

        <p className="stock">
          Stock: {product.stock}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;