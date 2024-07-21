import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Login.css';
import { FaLock, FaUser } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const  Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://127.0.0.1:8000/api/register", {
          email,  
          username,
          password,
          password_confirm

           
        });    navigate("/login");
        alert("Inscris");
    } catch (error) {
        console.error(error);
        alert("Reverifiez les informations entrez")
    }
};
  return (
    <div className='wrapper'>
       <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className='input-box'> 
             <input type="text" placeholder='Email'value={email} onChange={(event) => setEmail(event.target.value)} required />
             <FaUser className='icon' />
            </div>
            <div className='input-box'> 
             <input type="text" placeholder='Login'value={username} onChange={(event) => setUsername(event.target.value)} required />
             <FaUser className='icon' />
            </div>
            <div className='input-box'> 
             <input type="Password" placeholder='Mot de passe' value={password} onChange={(event) => setPassword(event.target.value)} required  />
             <FaLock className='icon'/>
             </div>
             <div className='input-box'> 
             <input type="Password" placeholder='Confirmez le Mot de passe' value={password_confirm} onChange={(event) => setPassword_confirm(event.target.value)} required  />
             <FaLock className='icon'/>
             </div>
             <div className='remember-forgot'>
                <label> <input type="checkbox" /> Remember me</label>
                <a href="#"> Forgot password?</a>
             </div>
             <button type='submit'>Register</button>
             <div className='register-link'>
                <p>vous avez un deja un compte? <Link to={'/login'}>Login</Link></p>
             </div>
        </form>

    </div>
  )
}
export default Register
