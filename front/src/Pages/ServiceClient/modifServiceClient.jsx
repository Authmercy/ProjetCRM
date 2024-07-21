import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getGestionnaire,getClient } from '../../services/servise'
const UpdateServiceClient = ({ openSidebarToggle, OpenSidebar }) => {
    const navigate = useNavigate();
    const [date_demande, setdate_demande] = useState("");
    const [ problemeSignale, setproblemeSignale] = useState("");
    const [statut, setStatut] = useState("Nouveau")
    const[ client, setClient] = useState("");
    const [gestionnaire, setGestionnaire] = useState("");
    const[ Clients, setClients] = useState([]);
    const [Gestionnaires, setGestionnaires] = useState([]);
    const [statuts, setStatuts] = useState([
        {value: 'Nouveau', label: 'Nouveau'},
        {value: 'Encour', label: 'Encour de traitement'},
        {value: 'Refuse', label: 'Refusé'},
        {value: 'Regle', label: 'Reglé'},
        {value: 'Ferme', label: 'Fermé'},
    ]);

    
    const location = useLocation();
    const camId = location.pathname.split("/")[2];
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/${camId}/update_serviceClient/`, {
                date_demande,
                problemeSignale,
                statut,
                client_id: client ,
                gestionnaire_id: gestionnaire,
                
               
            });  navigate("/service");
            alert("Interaction modifié avec success");
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        let mount = true
        getClient().then(res => {
            console.log("res from api", res)
            setClients(res)
            return () => mount = false
        })
    }, []);
    

    useEffect(() => {
        let mount = true
        getGestionnaire().then(res => {
            console.log("res from api", res)
            setGestionnaires(res)
            return () => mount = false
        })
    }, []);

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">

               
                <div className='containerD'>
                        <header>Modifier une Interaction</header>
                        <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Ajouter une Interaction</span>
                                    </div>

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Date</label>
                                            <input type='date' id='nom' value={date_demande} onChange={(event) => setdate_demande(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Probleme Signalé</label>
                                            <input type='textfield' id='nom' value={problemeSignale} onChange={(event) => setproblemeSignale(event.target.value)} required />
                                        </div>
                                       
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Client</label>
                                            <select className="form-control" value={client} onChange={(event) => setClient(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  un Client</option>
                        {Clients.map((element,index) => (
                          <option key={index} value={element.id}>{element.id}/{element.nom}</option>
                        ))}
                      </select>
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Gestionnaire</label>
                                            <select className="form-control" value={gestionnaire} onChange={(event) => setGestionnaire(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  un Gestionnaire</option>
                        {Gestionnaires.map((element,index) => (
                          <option key={index} value={element.id}>{element.id}/{element.nom}</option>
                        ))}
                      </select>
                                        
                      <div className='input-field'>
                                                <label htmlFor='numerotel'>Statut</label>
                                    
                                      <select value={statut} onChange={(e) => setStatut(e.target.value)} required>
                                      <option value="">Selectionner le statut a Client</option>
                        {statuts.map((statut) => (
                            <option key={statut.value} value={statut.value}>
                                {statut.label}
                            </option>
                        ))}
                    </select>
                                            </div>
                                        </div>          
                      
                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Enregistrer l'interaction</button>
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

export default UpdateServiceClient