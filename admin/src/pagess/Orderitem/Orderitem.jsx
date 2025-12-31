import React, { useEffect, useState } from "react";
import "./Orderitem.css";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../../assets/assets";

const Orderfood = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/list");
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(url + "/api/order/status", {
        orderId,
        status,
      });
      fetchAllOrders();
    } catch (err) {
      console.log(err);
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">

            <div className="order-icon"> <img src={assets.parcel} alt="parcel" /> </div>

            <div className="order-main">
              <p className="order-id"> <b>Order ID:</b> {order._id} </p>
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={idx}> {item.name} × {item.quantity} {idx !== order.items.length - 1 && ", "}</span>
                ))}
              </p>

              <div className="order-address">
                <p><b>Name:</b> {order.address?.name}</p>
                <p><b>Phone:</b> {order.address?.phone}</p>
                <p>
                  <b>Address:</b>{" "}
                  {order.address?.street}, {order.address?.city},{" "}
                  {order.address?.state} - {order.address?.pincode}
                </p>
              </div>
            </div>

            <div className="order-meta">
              <p className="order-amount">₹{order.amount}</p>
              <p className="order-payment">{order.payment ? "Paid ✅" : "Pending ❌"}</p>
            </div>

            <div className="order-status-box">
              <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderfood;
