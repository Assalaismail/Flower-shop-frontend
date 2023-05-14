import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  return (
    <div className="login-container">
      <h1 className='login-h1'>Login Page</h1>
      <form className='form-login'>
        <label htmlFor="username" className='label-login'>Email:</label>
        <input type="text" id="username" name="username" className='input-login'/>
        <label htmlFor="password" className='label-login'>Password:</label>
        <input type="password" id="password" name="password" className='input-login'/>
        <button className="button-login" type="submit">Login</button>
      </form>
      <div className='registration'>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
