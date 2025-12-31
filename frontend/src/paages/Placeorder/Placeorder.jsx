import { useContext, useState } from "react";
import { StoreContext } from "../../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Placeorder.css";

const Placeorder = () => {
  const { food_list, cartItems, token, url } = useContext(StoreContext);
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-box">
          <h2>Login required 🔐</h2>
          <p>Please login to place an order</p>
          <button onClick={() => navigate("/")}>Login</button>
        </div>
      </div>
    );
  }

  const [address, setAddress] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const orderItems = food_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({...item,quantity: cartItems[item._id],}));

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,0
  );

  const delivery = 40;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    if (!address.name || !address.address || !address.phone) {toast.error("Please fill all address details");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/order/place`,
        {
          items: orderItems,
          amount: total,
          address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Redirecting to payment...");
        setTimeout(() => {window.location.href = res.data.session_url;}, 1000);
      } else {
        toast.error("Order failed. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="placeorder">
      <div className="placeorder-left">
        <h2>Delivery Information</h2>
        <input type="text" placeholder="Full Name" value={address.name} onChange={(e) =>setAddress({ ...address, name: e.target.value })}/>
        <input type="text" placeholder="Delivery Address" value={address.address} onChange={(e) =>setAddress({ ...address, address: e.target.value })}/>
        <input type="tel" placeholder="Phone Number" value={address.phone} onChange={(e) =>setAddress({ ...address, phone: e.target.value })}/>
        <button className="back-btn" onClick={() => window.history.back()}>← Back to Cart</button>
      </div>

      <div className="placeorder-right">
        <div className="order-summary">
          <h3>Order Summary</h3>
          {orderItems.map((item) => (
            <div className="order-item" key={item._id}><span>{item.name} × {item.quantity}</span><span>₹{item.price * item.quantity}</span></div>
          ))}

          <div className="summary-divider"></div>
           <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="summary-row"><span>Delivery Charges</span><span>₹{delivery}</span></div>
          <div className="summary-divider"></div>
          <div className="summary-total"><span>Total</span><span>₹{total}</span></div>
          <button className="place-btn" onClick={placeOrder}>PAY ₹{total}</button>
          <p className="summary-note">🔒 Secure payment • 100% safe checkout</p>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
