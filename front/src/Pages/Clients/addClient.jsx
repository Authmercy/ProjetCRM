import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { getClient } from '../../services/servise'
const AddClient = ({ openSidebarToggle, OpenSidebar }) => {

   
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_client/", {
                nom,
                prenom,
                email,
                telephone,
                address,
            });
            alert("Client ajouté avec success");
        } catch (error) {
            console.error(error);
        }
    };

    const [Clients, setClients] = useState([])

   


    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">

                    
                <div className='containerD'>
                        <header>Ajouter un Client</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Ajouter un client</span>
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
                                        <button type='submit'>Enregistrer le client</button>
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

export default AddClient