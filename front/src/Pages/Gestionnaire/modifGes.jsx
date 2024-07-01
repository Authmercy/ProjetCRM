import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateGestionnaire = ({ openSidebarToggle, OpenSidebar }) => {

   
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate(); 
    const location = useLocation();
    const clientid = location.pathname.split("/")[2];


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/${clientid}/update_gestionnaire/`, {
                nom,
                prenom,
                email,
                telephone,
                address,
            });navigate("/ges");
            alert("Gestionnaire modifié avec success");
        } catch (error) {
            console.error(error);
        }
    };

   
   


    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">

                    
                <div className='containerD'>
                        <header>Modifier un Gestionnaire</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Modifier un Gestionnaire</span>
                                    </div>

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Nom </label>
                                            <input type='text' id='nom' value={nom} onChange={(event) => setNom(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Prenom </label>
                                            <input type='text' id='nom' value={prenom} onChange={(event) => setPrenom(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='adressemail'>Adresse mail</label>
                                            <input type='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Numero de telephone</label>
                                            <input type='text' id='telephone' value={telephone} onChange={(event) => setTelephone(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Adresse</label>
                                            <input type='text' id='address' value={address} onChange={(event) => setAddress(event.target.value)} required />
                                        </div>

                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Enregistrer le Gestionnaire</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
                </div>
            </main >
        </div >
    

    );
}

export default UpdateGestionnaire