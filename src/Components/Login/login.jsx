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
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
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

      if (response.status === 200) {
        swal({
          title: "Login successful",
          icon: "success",
        }).then(() => {

          localStorage.clear();
          sessionStorage.setItem("token", response.data.token);
          if (response.data.userType === "superAdmin") {
            {console.log(response.data)}
            sessionStorage.setItem('id', response.data._id);
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userType', response.data.userType);
            window.location.href = "/items";
          } else if (response.data.userType === "user") {
            window.location.href = "/shop";
            sessionStorage.setItem('id', response.data._id);
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userType', response.data.userType);
          } else {
            window.location.href = "/";
          }
        });
      } else {
        swal({
          title: "Login failed",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
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
