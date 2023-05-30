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
import Category from "./Pages/Shop/category";
import Single from "./Pages/Single/single";

import DashLayout from "./Pages/Dashboard/dashlayout";
import Items from "./Pages/Dashboard/items/items";
import Categorydashitem from "./Pages/Dashboard/items/category";
import Categories from "./Pages/Dashboard/Categories/categories";
import Reservation from "./Pages/reservation/reservation";
import Reservations from "./Pages/Dashboard/reservations/reservations";
import Users from "./Pages/Dashboard/users/user";
import Order from "./Pages/Orders/order";
import Ordersdash from "./Pages/Dashboard/orders/orders";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<Category />} />
            <Route path="/shop/:category_id" element={<Shop />} />
            <Route path="/single/:id" element={<Single />} />

            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/order" element={<Order />} />


          </Route>

          <Route path="/" element={<DashLayout />}>
          <Route path="/items" element={<Categorydashitem />} />
          <Route path="/items/:category_id" element={<Items />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Ordersdash />} />





            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
