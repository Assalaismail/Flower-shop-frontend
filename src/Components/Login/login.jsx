import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      swal({
        title: "Error",
        text: "Please fill in all the fields",
        icon: "error",
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-button',
        },
      });
      return;
    }
  
    try {
   
      const response = await axios.post(
        "https://flower-shop.onrender.com/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
   
  
      if (response.data.message === "User exists") {
        swal({
          title: "Login successful",
          icon: "success",
         
          
        }).then(() => {
          localStorage.clear();
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("id", response.data._id);
          sessionStorage.setItem("userType", response.data.userType);
  
          if (response.data.userType === "superAdmin") {
            window.location.href = "/items";
          } else if (response.data.userType === "user") {
            window.location.href = "/shop";
          } else {
            window.location.href = "/";
          }
        });
      } else  {
        swal({
          title: "Login failed",
          text: response.data.message,
          icon: "error",
          customClass: {
            container: 'custom-swal-container',
            title: 'custom-swal-title',
            content: 'custom-swal-content',
            confirmButton: 'custom-swal-button',
          },
        });
      }
    } catch (error) {
      swal({
        title: "Login failed",
        text: "Please try again",
        icon: "error",
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-button',
        },
      });
      console.error(error);
    }
  };
  
  return (
    <div className="login-container">
      <div className="border-reg">
      <h1 className="login-h1">Login Page</h1>
      
      <form className="form-login" onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className="label-login">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-login"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="label-login">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-login"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="button-login" type="submit">
          Login
        </button>
      </form>
      <div className="registration">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

export default Login;
