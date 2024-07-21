import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddClientPropect = ({ openSidebarToggle, OpenSidebar }) => {

   
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_clientP/", {
                nom,
                prenom,
                email,
                telephone,
                address,
            });    navigate("/clientP");
            alert("Prospect ajouté avec success");
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
                        <header>Ajouter un Prospect</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Ajouter un prospect</span>
                                    </div>

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Nom client</label>
                                            <input type='text' id='nom' value={nom} onChange={(event) => setNom(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Prenom client</label>
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
                                        <button type='submit'>Enregistrer le prospect </button>
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

export default AddClientPropect