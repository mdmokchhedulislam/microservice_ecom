import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderApi";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(
      localStorage.getItem("cart")
    ) || []
  );

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const removeItem = (productId) => {
    const updatedCart = cart.filter(
      (item) => item.productId !== productId
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const checkout = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const profileResponse =
        await fetch(
          "http://localhost:5001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const profile =
        await profileResponse.json();

      const order = await createOrder({
        userId: profile.user._id,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      console.log(order);

      localStorage.removeItem("cart");
      setCart([]);

      alert("Order created successfully!");

      navigate("/orders");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Order creation failed"
      );
    }
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.productId}
              >
                <div>
                  <h3>{item.name}</h3>

                  <p>
                    ৳{item.price.toLocaleString()} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <div>
                  <strong>
                    ৳
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </strong>

                  <button
                    onClick={() =>
                      removeItem(
                        item.productId
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>
              Total: ৳
              {total.toLocaleString()}
            </h2>

            <button onClick={checkout}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;