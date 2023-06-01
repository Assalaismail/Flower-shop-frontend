import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import logo from '../../Assets/logof.png';
import cart from '../../Assets/cart.png';
import { Link } from "react-router-dom";


function Navbar() {

  let navigate=useNavigate();
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false)
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();
  const token=sessionStorage.getItem("token")
  useEffect(() => {
    setShow(false);
    setMenu("nav-links");
    setIcon("bx bx-menu");
  }, [location]);

  const toggle = () => {
    if (!show) {
      
      setMenu("nav-links open");
      setIcon("bx bx-x");
    } else {
     
      setMenu("nav-links");
      setIcon("bx bx-menu");
    }
    setShow(!show);
  };

  // function navbar(){
  //   if (window.scrollY >= 851){
  //     setNav(true)
  //   }
  //   else{
  //     setNav(false)
  //   }
  // }

  const handleSignClick = () => {
    navigate("/login")
    setMenu("nav-links");
    setIcon("bx bx-menu");
 
  };

  const handleSignout=()=>{
    sessionStorage.clear();
        navigate("/");
  }

  // window.addEventListener("scroll", navbar);

  return (
    <header className={nav ? 'not' : 'sticky-header'}>
      <a href="/" className="logo">
        <img src={logo} alt="Dayaa logo" className="header-logo" />
        <span>Fleur De Vie</span>
      </a>
      <ul className={menu}>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
            Shop
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/aboutUs" className={location.pathname === '/aboutUs' ? 'active' : ''}>
            About us
          </a>
        </li>

        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'active' : ''}>
            Contact us
          </a>
        </li>
        <li className="willhide">
          <p onClick={handleSignClick} className={location.pathname === '/sign-in' ? 'active' : ''}>
            
          </p>
        </li>

      
        {token ? (
          <li className={nav ? "maintain" : "normal"}>
            <p onClick={handleSignout} className="ri-user-3-fill">
              Logout
            </p>
          </li>
        ) : (
          <li className={nav ? "maintain" : "normal"}>
            <p
              onClick={handleSignClick}
              className={`{
                location.pathname === "/login" ? "active" : ""
              }ri-user-3-fill`}
            
            >
              Sign In
            </p>
          </li>
        )}
        <li>
          <Link to="/order">
            <img src={cart} alt="cart" className='cart'/>
          </Link>
        </li>
        
      </ul>
      
      <div  className={nav ? 'head-icons' : 'header-icons'}>
      {/* <div className='signcart'>
        {token ? (
          <li className={nav ? "maintain" : "normal"}>
            <p onClick={handleSignout} className="ri-user-3-fill">
              Logout
            </p>
          </li>
        ) : (
          <li className={nav ? "maintain" : "normal"}>
            <p
              onClick={handleSignClick}
              className={`{
                location.pathname === "/login" ? "active" : ""
              }ri-user-3-fill`}
            >
              Sign In
            </p>
          </li>
        )}
        <li>
          <Link to="/order">
            <img src={cart} alt="cart" className='cart'/>
          </Link>
        </li>
        </div> */}
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;

