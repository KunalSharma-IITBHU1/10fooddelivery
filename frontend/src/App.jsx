import { Routes, Route } from 'react-router-dom'
import Home from './paages/Home/Home'
import Cart from './paages/Cart/Cart'
import Placeorder from './paages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Login from './Login/Login'
import Orders from './paages/Orders/Orders'
import { useState,useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from './paages/payment/paymentSuccess'

const App = () => {

  const [isLogin, setisLogin] = useState(false)
  const [isAuth, setIsAuth] = useState(false);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark"/>
      {isLogin && <Login setisLogin={setisLogin} setIsAuth={setIsAuth} />}

      <div className='app'>
        <Navbar setisLogin={setisLogin}  isAuth={isAuth} setIsAuth={setIsAuth} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart isAuth={isAuth}  setisLogin={setisLogin} />} />
          <Route path='/placeorder' element={<Placeorder  />} />
           <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders isAuth={isAuth} setisLogin={setisLogin} />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
