import React, { useState } from 'react'
import './Home.css' 
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Explore-Menu/Explore-menu'
import Foodlist from '../../components/Foodlist/Foodlist'
import Appdownload from '../../components/Appdownload/Appdownload'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory} />
      <Foodlist category={category} />
      <Appdownload/>
    </div>
  )
}

export default Home
