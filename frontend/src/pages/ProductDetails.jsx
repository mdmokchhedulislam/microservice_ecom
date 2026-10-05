import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productApi";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingProduct = cart.find(
      (item) => item.productId === product._id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    navigate("/cart");
  };

  if (!product) {
    return (
      <h2 className="center">
        Loading product...
      </h2>
    );
  }

  return (
    <div className="container">
      <div className="product-details">
        <div className="details-image">
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

        <div className="details-content">
          <p className="category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p>
            {product.description}
          </p>

          <h2>
            ৳{product.price.toLocaleString()}
          </h2>

          <p>
            Available: {product.stock}
          </p>

          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }
          />

          <button
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;