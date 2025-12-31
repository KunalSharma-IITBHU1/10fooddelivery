import React, { useState, useContext } from "react";
import "./Login.css";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/context";

const Login = ({ setisLogin, setIsAuth }) => {
  const { fetchCart } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Log In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =currentState === "Sign Up" ? "https://one0fooddelivery-backend.onrender.com/api/user/register":"https://one0fooddelivery-backend.onrender.com/api/user/login";

      const payload =currentState === "Sign Up"? { name, email, password }:{ email, password };

      const res = await axios.post(url, payload);

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      setisLogin(false);
      toast.success(currentState === "Sign Up"? "Account created successfully": "Login successful");

      try {
        await fetchCart();
      } catch (cartError) {
        console.log("⚠️ Cart fetch failed (ignored)", cartError);
      }

    } catch (error) {
      console.log("LOGIN ERROR 👉", error);
      toast.error(error?.response?.data?.message || "Something went wrong" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="login-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} alt="close"onClick={() => setisLogin(false)}/>
        </div>

        <div className="login-inputs">
          {currentState === "Sign Up" && (
            <input type="text" placeholder="Your Name" required value={name}onChange={(e) => setName(e.target.value)} />
          )}
          <input type="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input  type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : currentState === "Sign Up" ? "Create Account": "Log In"}
        </button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to terms and conditions</p>
        </div>

        {currentState === "Log In" ? (
          <p>Create a New Account?{" "}<span onClick={() => setCurrentState("Sign Up")}>  Click Here</span></p>
        ) : (
          <p>  Already have an account?{" "}  <span onClick={() => setCurrentState("Log In")}>Login Here </span></p>
        )}
      </form>
    </div>
  );
};

export default Login;
