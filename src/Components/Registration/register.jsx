import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import swal from "sweetalert";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        name,
        email,
        password,
        userType: "user",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("register ok")
        console.log(response)
        swal({
          title: "Register successful",
          icon: "success",
        }).then(() => {
          window.localStorage.setItem("token", response.data.token);
          window.location.href = "/login";
        });
      } else {
        swal({
          title: "Register failed",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      
    }
  };
  return (
    <div className="register-container">

      <div className="border-reg">
      <h1 className="register-h1">Register Page</h1>
      <form className="form-register" onSubmit={handleRegisterSubmit}>
        <label htmlFor="username" className="label-register">
          Username:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="input-register"
          onChange={handleNameChange}
        />
        <label htmlFor="email" className="label-register">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-register"
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="label-register">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-register"
          onChange={handlePasswordChange}

        />
        
        <button type="submit" className="button-register">
          Register
        </button>
      </form>
      </div>
    </div>
  );
}

export default Register;
