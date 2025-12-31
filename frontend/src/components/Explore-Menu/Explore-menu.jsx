import React from 'react';
import './Explore-menu.css'
import { menu_list } from '../../assets/assets';

const Exploremenu = ({ category, setCategory }) => {
  return (
    <div className='explore' id='explore'>
      <h1>What are you craving today? </h1>
      <p className='explore-text'> Discover hand-picked dishes across cuisines. Freshly prepared, 
  hygienic, and delivered fast to your doorstep.</p>
      <div className="explore-menu-list">
        {menu_list.map((item ,index)=>{
            return (
                <div  onClick={() =>setCategory(prev => prev === item.menu_name ? "All" : item.menu_name) } 
                key={index} className="explore-menu-list-item">
                <img src={item.menu_image} alt={item.menu_name}  className={category === item.menu_name ? "active" : ""}
                  style={{opacity: category === item.menu_name ? "1" : "0.7"}}/>
                <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  );
}

export default Exploremenu;
