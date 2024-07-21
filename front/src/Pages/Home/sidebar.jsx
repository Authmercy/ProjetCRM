import React from 'react'
import './/sidebar.css'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill, BsFillGearFill , BsFillBagFill , BsChatDotsFill 
}



    from 'react-icons/bs'
 import { Link } from 'react-router-dom';
function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    < header /> C R M
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/accueil">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/client">
                        <BsPeopleFill  className='icon' /> Client 
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/clientP">
                        <BsPeopleFill  className='icon' /> Prospect 
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/produit">
                        <BsFillArchiveFill className='icon' /> Produits
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/cat">
                        <BsFillBagFill className='icon' /> Categories
                    </Link>
                    </li>
                <li className='sidebar-list-item'>
                    <Link to="/campagne">
                        <BsListCheck className='icon' /> Campagne
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/ges">
                        <BsPeopleFill className='icon' /> Gestionnaire
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/vente">
                        <BsCart3 className='icon' /> Vente
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/commade">
                        <BsCart3 className='icon' /> Commande
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/service">
                        <BsChatDotsFill className='icon' />ServiceClient
                    </Link>
                </li>
                

            </ul>
        </aside>
    )
}

export default Sidebar