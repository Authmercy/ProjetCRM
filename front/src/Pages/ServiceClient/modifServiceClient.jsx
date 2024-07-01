import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { getGestionnaire,getClient } from '../../services/servise'
const UpdateServiceClient = ({ openSidebarToggle, OpenSidebar }) => {

    const [date_demande, setdate_demande] = useState("");
    const [ problemeSignale, setproblemeSignale] = useState("");
    const [statut, setStatut] = useState("");
    const[ client, setClient] = useState("");
    const [gestionnaire, setGestionnaire] = useState("");
    const[ Clients, setClients] = useState("");
    const [Gestionnaires, setGestionnaires] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put("http://127.0.0.1:8000/api/${id}/update_serviceClient/", {
                date_demande,
                problemeSignale,
                statut,
                client ,
                gestionnaire
                
               
            });
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
    const [statutChoices, setStatutChoices] = useState([]);

    useEffect(() => {
        fetchStatutChoices();
    }, []);

    const fetchStatutChoices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/statut-choices/');
            setStatutChoices(response.data.choices);
        } catch (error) {
            console.error('Error fetching statut choices:', error);
        }
    };


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
                                        <span className='title'>Modifier une Interaction</span>
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
                          <option key={index} value={element.id}>{element.id}/{element.nomClient}</option>
                        ))}
                      </select>
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Gestionnaire</label>
                                            <select className="form-control" value={gestionnaire} onChange={(event) => setClient(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  un Gestionnaire</option>
                        {Gestionnaires.map((element,index) => (
                          <option key={index} value={element.id}>{element.id}/{element.nom}</option>
                        ))}
                      </select>
                      
                      <div className='input-field'>
                                            <label htmlFor='numerotel'>Statut</label>
                                            <select className="form-control" value={statut} onChange={(event) => setStatutChoices(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  le Statut</option>
                        
                         {statutChoices.map(choice => (
                    <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
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