import React from 'react'
import {
BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill, BsFillGearFill
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
                    <Link to="/cat">
                        <BsFillArchiveFill className='icon' /> Categories
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/produit">
                        <BsFillArchiveFill className='icon' /> Produits
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/campagne">
                        <BsFillGrid3X3GapFill className='icon' /> Campagne
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/client">
                        <BsPeopleFill className='icon' /> Client
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/vente">
                        <BsListCheck className='icon' /> Vente
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/commade">
                        <BsListCheck className='icon' /> Commande
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/service">
                        <BsListCheck className='icon' />ServiceClient
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/apropos">
                        <BsMenuButtonWideFill className='icon' /> Apropos
                    </Link>
                </li>

            </ul>
        </aside>
    )
}

export default Sidebar