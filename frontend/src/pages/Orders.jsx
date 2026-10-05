
import { useEffect, useState } from "react";
import { getProfile } from "../services/userApi";
import { getOrdersByUser } from "../services/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      // Check login
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your orders.");
        return;
      }

      // Get logged-in user profile
      const profile = await getProfile();

      console.log("Profile:", profile);

      if (!profile?.user?._id) {
        setError("Unable to identify logged-in user.");
        return;
      }

      const userId = profile.user._id;

      // Get user's orders
      const orderResponse = await getOrdersByUser(userId);

      console.log("Orders:", orderResponse);

      setOrders(orderResponse?.orders || []);
    } catch (error) {
      console.error("Load orders error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <h1>My Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <h1>My Orders</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>My Orders</h1>

      {/* No orders */}
      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>You have no orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              
              {/* Order Header */}
              <div className="order-header">
                <div>
                  <h3>
                    Order #{order._id?.slice(-8)}
                  </h3>

                  <p>
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString()
                      : "Date unavailable"}
                  </p>
                </div>

                <span className="order-status">
                  {order.status || "pending"}
                </span>
              </div>

              {/* Order Items */}
              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div
                    className="order-item"
                    key={`${item.productId}-${index}`}
                  >
                    <div>
                      <strong>{item.name}</strong>

                      <p>
                        ৳{Number(item.price || 0).toLocaleString()} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <strong>
                      ৳
                      {Number(
                        item.subtotal || 0
                      ).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="order-footer">
                <strong>
                  Total: ৳
                  {Number(
                    order.totalAmount || 0
                  ).toLocaleString()}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
