import React from 'react';
import { Link } from 'react-router-dom';
import './register.css';


function Register() {
  return (
    <div className="register-container">
      <h1 className='register-h1'>Register Page</h1>
      <form className='form-register'>
        <label htmlFor="username" className='label-register'>Username:</label>
        <input type="text" id="username" name="username" className='input-register'/>
        <label htmlFor="email" className='label-register'>Email:</label>
        <input type="email" id="email" name="email" className='input-register'/>
        <label htmlFor="password" className='label-register'>Password:</label>
        <input type="password" id="password" name="password" className='input-register'/>
        <label htmlFor="confirm-password" className='label-register'>Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" className='input-register'/>
        <button type="submit" className='button-register'>Register</button>
      </form>
    </div>
  );
}

export default Register;
