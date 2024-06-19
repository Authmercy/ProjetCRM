import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { getClient, getProduit } from '../../services/servise'
const AddCommande = ({ openSidebarToggle, OpenSidebar }) => {

    const [quantite, setQuantite] = useState("");
    const [date_fin, setDate_fin] = useState("");
    const [produit, setProduit] = useState("");
    const [client, setClient] = useState("");
    const [statut, setStatut] = useState("");
    const [Produits, setProduits] = useState([]);
    const [Clients, setClients] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_commande/", {
                quantite,
               date_fin ,
               client,
               statut,
              produit,
               
            });
            alert("Commande ajouté avec success");
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
        getProduit().then(res => {
            console.log("res from api", res)
            setProduits(res)
            return () => mount = false
        })
    }, []);
    const [statutChoices, setStatutChoices] = useState([]);

    useEffect(() => {
        fetchStatutChoices();
    }, []);

    const fetchStatutChoices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/choices/');
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
                        <header>Ajouter une Commande</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Ajouter une Commande</span>
                                    </div>

                                    <div className='fields'>
                                     
                                       
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Date de Commande</label>
                                            <input type='date' id='nom' value={date_fin} onChange={(event) => setDate_fin(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Quantité</label>
                                            <input type='number' id='nom' value={quantite} onChange={(event) => setQuantite(event.target.value)} required />
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
                                            <label htmlFor='numerotel'>Produit</label>
                                            <select className="form-control" value={produit} onChange={(event) => setProduit(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  un Produit</option>
                        {Produits.map((element,index) => (
                          <option key={index} value={element.id}>{element.id}/{element.nomProduit}</option>
                        ))}
                      </select>
                      <div className='input-field'>
                                            <label htmlFor='numerotel'>Statut</label>
                                            <select className="form-control" value={statut} onChange={(event) => setStatut(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  le Statut</option>
                        
                         {statutChoices.map(choice => (
                    <option key={choice[0]} value={choice[0]}>{choice[1]}</option>
                ))}
            </select>
                                        </div>
                                        </div>

                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Enregistrer la Commande</button>
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

export default AddCommande