import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import { getClient, getProduit } from '../../services/servise'
import Sidebar from '../Home/sidebar'
import { Link, useLocation, useNavigate } from "react-router-dom";
import './ad.css'
const EnvoieMaiL = ({ openSidebarToggle, OpenSidebar }) => {

    const [email, setEmail] = useState('');
    const [listClient, setListClient] = useState(false);
    const [client, setClient] = useState('');
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let mount = true
        getClient().then(res => {
            console.log("res from api", res)
            setClients(res)
            return () => mount = false
        })
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/email/", {
                listClient,
                client_id: client,
                email,
                objet,
                message,
            });
            navigate("/Accueil");
            alert("Mail envoyé");
        } catch (error) {
            console.error('Error creating commande:', error);
            console.error('Error response data:', error.response?.data);
        }
    };

    return (
        <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <main className='main-container'>
         
                <div className="contenu">
                    <div className='containerD'>
                        <header>Ajouter un courriel</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Envoyer un courriel </span>
                                    </div>

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='client'>Client</label>
                                            <select className="form-control" value={client} onChange={(event) => setClient(event.target.value)} id="client">
                                                <option value="">Sélectionner un Client</option>
                                                {clients.map((element) => (
                                                    <option key={element.id} value={element.id}>{element.nom}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='listClient'>Envoyer à tous les clients</label>
                                            <input type='checkbox' id='listClient' checked={listClient} onChange={() => setListClient(!listClient)} />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='email'>Adresse mail de l'expéditeur</label>
                                            <input type='email' id='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='objet'>Objet</label>
                                            <input type='text' id='objet' value={objet} onChange={(event) => setObjet(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='message'>Message</label>
                                            <textarea id='message' value={message} onChange={(event) => setMessage(event.target.value)} required />
                                        </div>
                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Envoyer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default EnvoieMaiL

