import React from 'react'
import Navbardash from './Navbar/navbar';

import { Outlet, useLocation } from 'react-router';
const DashLayout = () => {
  let location=useLocation()

  return (
    <>
<section className="mainer">
  <main className="main">
    <Navbardash />
    <Outlet/>
   
  </main>
</section>

    </>
   
  )
}

export default DashLayout