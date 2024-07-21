import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Login.css';
import { FaLock, FaUser } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const  Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://127.0.0.1:8000/api/login", {
          username,
          password
        });    navigate("/accueil");
        alert("Connecté");
    } catch (error) {
        console.error(error);
        alert("Vous n'etes pas autorisé a acceder cette page")
    }
};
  return (
    <div className='wrapper'>
       <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='input-box'> 
             <input type="text" placeholder='Login'value={username} onChange={(event) => setUsername(event.target.value)} required />
             <FaUser className='icon' />
            </div>
            <div className='input-box'> 
             <input type="Password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} required  />
             <FaLock className='icon'/>
             </div>
             <div className='remember-forgot'>
                <label> <input type="checkbox" /> Remember me</label>
                <a href="#"> Forgot password?</a>
             </div>
             <button type='submit'>Login</button>
             <div className='register-link'>
                <p>Vous n'avez pas de compte? <Link to={'/register'}>Register</Link></p>
             </div>
        </form>

    </div>
  )
}
export default Login
