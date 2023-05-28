import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbardash() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState("nav-links-dash");
  const [icon, setIcon] = useState("bx bx-menu-dash");
  const location = useLocation();

  useEffect(() => {
    setShow(false);
    setMenu("nav-links-dash");
    setIcon("bx bx-menu-dash");
  }, [location]);

  const toggle = () => {
    if (!show) {
      setMenu("nav-links-dash open");
      setIcon("bx bx-x");
    } else {
      setMenu("nav-links-dash");
      setIcon("bx bx-menu-dash");
    }
    setShow(!show);
  };

  function navbar() {
    if (window.scrollY >= 851) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  window.addEventListener("scroll", navbar);

  return (
    <header className={nav ? "not-dash" : "sticky-header-dash"}>
      <div className="menu-icon" id="menu-icon" onClick={toggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={menu}>
        <li className={nav ? "maintain" : "normal"}>
          <a href="/categories" className={location.pathname === "/categories" ? "active" : ""}>
            categories
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a href="/items" className={location.pathname === "/items" ? "active" : ""}>
            items
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a href="/users" className={location.pathname === "/users" ? "active" : ""}>
            users
          </a>
        </li>
        <li className={nav ? "maintain" : "normal"}>
          <a href="/orders" className={location.pathname === "/orders" ? "active" : ""}>
            orders
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Navbardash;
