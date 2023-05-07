import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { MyContext } from "./myContext";
import Shop from "./Pages/Shop/shop";
import Layout from "./Pages/layout.jsx";
import Home from "./Components/Home/home";
import Aboutus from "./Pages/Aboutus/aboutus";
import ContactUs from "./Pages/Contactus/contactus";



function App() {
  
  return (
    <>
   
      <BrowserRouter>
        <Routes>
          

          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>



          
          </Route>
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
