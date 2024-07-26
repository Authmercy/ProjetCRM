import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';
import SearchBar from './Search'
function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
  
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <Link to={`/mail`}>    <BsFillEnvelopeFill className='icon'/></Link>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header