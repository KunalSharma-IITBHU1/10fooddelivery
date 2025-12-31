import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/context";

function Navbar({ setisLogin }) {
  const location = useLocation();
  const path = location.pathname;

  const { token, logout } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/"> <img src={assets.logo} alt="Foodify" className="logo" /> </Link>

    <ul className="nav-menu">
     <Link to="/" className={path === "/" ? "active" : ""}>Home </Link>
     <Link  to="/" onClick={() =>  document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" }) }>Explore</Link>
      <Link to="/orders" className={path === "/orders" ? "active" : ""}> Orders </Link>
      <Link to="/" onClick={() =>   document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}>About</Link>
      </ul>

      <div className="navright">
        <img src={assets.search_icon} alt="search" />
        <div className="search-icon">
          <Link to="/cart"> <img src={assets.basket_icon} alt="cart" /> </Link>
        </div>

        {!token ? (
          <button onClick={() => setisLogin(true)}>Log in</button>
        ) : (
          <button onClick={logout} style={{ background: "#333", color: "#fff" }} >Log out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
