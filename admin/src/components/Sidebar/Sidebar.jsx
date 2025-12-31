import React from 'react';
import './Sidebar.css'
import assets from '../../assets/assets.js';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-1">
        <NavLink to='/add' className="sidebar-1-1">
          <img src={assets.add_icon} alt=""/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-1-1">
          <img src={assets.order_icon} alt=""/>
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-1-1">
          <img src={assets.order_icon} alt=""/>
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
