import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const url = "https://one0fooddelivery-backend.onrender.com";

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {setFoodList(res.data.data);}
    } catch (error) {console.log("Food fetch error");}
  };
  useEffect(() => {
  fetchFoodList();
}, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]: (prev[itemId] || 0) + 1,}));

    if (!token) return;

    await axios.post(
      `${url}/api/cart/add`,
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]: prev[itemId] - 1,}));

    if (!token) return;

    await axios.post(
      `${url}/api/cart/remove`,
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const fetchCart = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${url}/api/cart/get`, {headers: { Authorization: `Bearer ${token}` },});
      if (res.data.success) {setCartItems(res.data.cartData);}
    } catch {console.log("Cart fetch error");}
  };

  const fetchOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${url}/api/order/user-orders`, {headers: { Authorization: `Bearer ${token}` },});
      if (res.data.success) {setOrders(res.data.data);}
    } catch {console.log("Orders fetch error");}
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCartItems({});
    setOrders([]);
  };

  useEffect(() => {
    fetchFoodList();

    if (token) {
      fetchCart();
      fetchOrders();
    } else {
      setCartItems({});
      setOrders([]);
    }
  }, [token]);

  return (
    <StoreContext.Provider value={{food_list,cartItems,orders,addToCart,removeFromCart,fetchOrders,fetchCart,token,setToken,logout,url,}}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
