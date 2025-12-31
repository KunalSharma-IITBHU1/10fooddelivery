import React, { useContext } from 'react'
import './Foodlist.css'
import { StoreContext } from '../../context/context'
import Fooditem from '../Fooditem/Fooditem'

const Foodlist = ({ category }) => {

  const { food_list } = useContext(StoreContext)

  return (
    <div className='foodlist'>
      <h2>Top dishes near you</h2>

      <div className="foodlist1">
        {food_list
          .filter((food) => {
            if (category === "All") return true;
             return food.category === category;
          })
          .map((item) => (
            <Fooditem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  )
}

export default Foodlist
