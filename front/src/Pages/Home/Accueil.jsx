import React from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './sidebar'
import Home from './Home'

const Accueil=({ openSidebarToggle, OpenSidebar }) => {

   

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Home />
  </div>
       
  )
}

export default Accueil