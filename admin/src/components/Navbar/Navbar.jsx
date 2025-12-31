import React from 'react';
import './Navbar.css'
import assets from '../../assets/assets'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
 <div className="navbar">
  <div className="nav-left"><NavLink to='/'><img src={assets.logo} className="logo" /></NavLink></div>

  <div className="nav-center">
    <input type="text" placeholder="Search orders, items..." />
  </div>

  <div className="nav-right">
    <img src={assets.profile_image} className="profile" />
  </div>
</div>
  );
}

export default Navbar;
