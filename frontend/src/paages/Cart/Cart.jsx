import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { food_list as assetFood } from "../../assets/assets";

const Cart = () => {
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  
  if (!token) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-box">
          <h2>Login required 🔐</h2>
          <p>Please login to view your cart</p>
          <button onClick={() => navigate("/")}>Login</button>
        </div>
      </div>
    );
  }

  const cartList = food_list.filter(
    (item) => cartItems[item._id] > 0
  );


  if (cartList.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-box">
          <h2>Your cart is empty 🛒</h2>
          <p>Add some delicious food to get started</p>
          <button onClick={() => navigate("/")}>Browse Food</button>
        </div>
      </div>
    );
  }

  const subtotal = cartList.reduce((sum, item) => sum + item.price * cartItems[item._id],0);

  const delivery = 40;
  const total = subtotal + delivery;

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cartList.map((item) => {
            const assetItem = assetFood.find((f) =>f.name.toLowerCase().trim() ===item.name.toLowerCase().trim());
            return (
              <div className="cart-item" key={item._id}>
                <img src={assetItem?.image} alt={item.name} className="cart-img"/>

                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="cart-qty">
                  <button onClick={() => removeFromCart(item._id)}>−</button>
                  <span>{cartItems[item._id]}</span>
                  <button onClick={() => addToCart(item._id)}>+</button>
                </div>

                <div className="cart-price">₹{item.price * cartItems[item._id]}</div>
              </div>
            );
          })}
        </div>

        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="row">
            <span>Delivery</span>
            <span>₹{delivery}</span>
          </div>

          <div className="row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/placeorder")}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
