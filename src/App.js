import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { MyContext } from "./myContext";
import Shop from "./Pages/Shop/shop";
import Layout from "./Pages/layout.jsx";
import Home from "./Components/Home/home";
import Aboutus from "./Pages/Aboutus/aboutus";
import ContactUs from "./Pages/Contactus/contactus";
import Login from "./Components/Login/login";
import Register from "./Components/Registration/register";



function App() {
  
  return (
    <>
   
      <BrowserRouter>
        <Routes>
          

          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/register" element={<Register/>}/>
          </Route>
     
        </Routes>

      </BrowserRouter>
     
    </>
  );
}

export default App;
