import React from 'react';
import './Appdownload.css'
import { assets } from '../../assets/assets';

const Appdownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
      <p>For Better Experience Download <br/>Foodify App</p>
      <div className="appdownload-platform">
        <img src={assets.play_store} alt=""/>
        <img src={assets.app_store} alt=""/>
      </div>
    </div>
  );
}

export default Appdownload;
