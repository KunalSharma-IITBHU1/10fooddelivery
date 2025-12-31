import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar';
import {Route, Routes} from 'react-router-dom'
import Listitem from './pagess/Listitem/Listitem'
import Orderitem from './pagess/Orderitem/Orderitem'
import Additem from './pagess/Additem/Additem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const App = () => {

  const url = "https://one0fooddelivery-backend.onrender.com"
  return (
    <div>
       <ToastContainer position="top-right" autoClose={3000} />
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
         <Route path='/add' element={<Additem url={url} />}/>
         <Route path='/list' element={<Listitem url={url} />}/>
         <Route path='/orders' element={<Orderitem  url={url}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
