import React from 'react';
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

      
        <div className="footer-content-left">
          <div className="logo-text"> Food<span>ify</span></div>
          <p>
            Foodify brings your favorite meals from local restaurants straight
            to your doorstep. Fast delivery, fresh food, and great taste.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook"/>
            <img src={assets.twitter_icon} alt="twitter"/>
            <img src={assets.linkedin_icon} alt="linkedin"/>
          </div>
        </div>

        
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li >Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

       
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>📞 +12-212-365</li>
            <li>✉️ contact@foodify.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        © {new Date().getFullYear()} Foodify. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
