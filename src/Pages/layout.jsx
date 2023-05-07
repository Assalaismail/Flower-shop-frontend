import React from 'react'
import Navbar from '../Components/Navbar/navbar';
import Footer from '../Components/Footer/footer';
import { Outlet, useLocation } from 'react-router';
const Layout = () => {
  let location=useLocation()

  return (
    <>
    <section className="mainer">
         <main className="main">
      <Navbar />
      <Outlet/>
      {location.pathname==="/login"?"":<Footer/>}
</main>
      </section>
    </>
   
  )
}

export default Layout