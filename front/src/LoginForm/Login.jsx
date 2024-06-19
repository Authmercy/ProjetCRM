import React from 'react'
import './Login.css';
import { FaLock, FaUser } from "react-icons/fa";

const  Login = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className='input-box'> 
             <input type="text" placeholder='Email' required />
             <FaUser className='icon' />
            </div>
            <div className='input-box'> 
             <input type="Password" placeholder='Password' required />
             <FaLock className='icon'/>
             </div>
             <div className='remember-forgot'>
                <label> <input type="checkbox" /> Remember me</label>
                <a href="#"> Forgot password?</a>
             </div>
             <button type='submit'>Login</button>
             <div className='register-link'>
                <p>Dont have an account? <a href="#">Register</a></p>
             </div>
        </form>

    </div>
  )
}
