import React, { useContext, useEffect } from "react";
import "./Order.css";
import { StoreContext } from "../../context/context";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders, token, fetchOrders } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="orders-page">
        <h2 className="orders-title">Your Orders</h2>
        <div className="orders-empty">
          <img src={assets.parcel_icon} alt="login required" />
          <h3>Login required 🔐</h3>
          <p>Please login to view your orders</p>
          <button className="browse-btn" onClick={() => navigate("/")}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2 className="orders-title">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <img src={assets.parcel_icon} alt="no orders" />
          <h3>No orders yet 🧾</h3>
          <p>Looks like you haven’t ordered anything yet</p>
          <button className="browse-btn" onClick={() => navigate("/")}>Browse Food</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-icon"><img src={assets.parcel_icon} alt="parcel" /></div>

              <div className="order-info">
                <div className="order-id">Order #{order._id.slice(-6)}</div>
                <div className="order-date">{new Date(order.date).toDateString()}</div>
              </div>

              <div className="order-meta">
                <p className="order-amount">₹{order.amount}</p>
                <p className={`order-status ${order.status.toLowerCase().replace(/\s/g, "-")}`}>{order.status}</p>
              </div>

              <div className="order-action">
                <button className="track-btn" onClick={()=>fetchOrders()} disabled={order.status === "Delivered"}>
                  {order.status === "Delivered" ? "Delivered" : "Track"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
