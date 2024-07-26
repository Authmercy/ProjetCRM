
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link, useNavigate } from "react-router-dom";
import { getClient, getProduit } from '../../services/servise'
import './acom.css'
const AddCommande = ({ openSidebarToggle, OpenSidebar }) => {

    const [Produits, setProduits] = useState([])
    const [produit, setProduit] = useState("")
    const [quantite, setQuantite] = useState("")
    useEffect(() => {
        let mount = true
        getProduit().then(res => {
            console.log("res from api", res)
            setProduits(res)
            return () => mount = false
        })
    }, []);
    const [date_fin, setDate_fin] = useState("");
    const [paniers, setPaniers] = useState([]);


    const [client, setClient] = useState("");
    const [statut, setStatut] = useState("");
    const [Clients, setClients] = useState([]);
    const [statuts, setStatuts] = useState([
        { value: 'Nouveau', label: 'Nouveau' },
        { value: 'Encour', label: 'Encour de traitement' },
        { value: 'Annule', label: 'Annulé' },
        { value: 'Valide', label: 'Validé' },
    ]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_commande/", {

                date_fin,
                client_id: client,
                statut,
                paniers: paniers.map(panier => ({
                    produit_id: panier.produit,
                    quantite: panier.quantite,

                })),

            }); navigate("/commade");
            alert("Commande ajouté avec success");
        } catch (error) {
            console.error('Error creating commande:', error);
            console.error('Error response data:', error.response?.data);
            alert('La quantité demandée  dépasse la quantité disponible .')
        }
    };

    const handleAddPanier = () => {
        setPaniers([...paniers, { produit: '', quantite: '', prix_unitaire: '' }]);
    };

    const handleRemovePanier = (index) => {
        const newPaniers = [...paniers];
        newPaniers.splice(index, 1);
        setPaniers(newPaniers);
    };

    useEffect(() => {
        let mount = true
        getClient().then(res => {
            console.log("res from api", res)
            setClients(res)
            return () => mount = false
        })
    }, []);

    const handleInputChange = (index, field, value) => {
        const newPaniers = [...paniers];
        newPaniers[index][field] = value;
        setPaniers(newPaniers);
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
                                            <label htmlFor='numerotel'>Client</label>
                                            <select className="form-control" value={client} onChange={(event) => setClient(event.target.value)} id="category" name=" Category">
                                                <option > Selectionner  un Client</option>
                                                {Clients.map((element, index) => (
                                                    <option key={index} value={element.id}>{element.id}/{element.nom}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <label>Statut:</label>
                                        <select value={statut} onChange={(e) => setStatut(e.target.value)} required>
                                            <option value="">Sélectionner le statut</option>
                                            {statuts.map(statut => (
                                                <option key={statut.value} value={statut.value}>{statut.label}</option>
                                            ))}
                                        </select>

                                        <h3>Paniers:</h3>
                                        {paniers.map((panier, index) => (
                                            <div key={index}>
                                                <label>Produit:</label>
                                                <select value={panier.produit} onChange={(e) => handleInputChange(index, 'produit', e.target.value)} required>
                                                    <option value="">Sélectionner un produit</option>
                                                    {Produits.map(produit => (
                                                        <option key={produit.id} value={produit.id}>{produit.nomProduit}</option>
                                                    ))}
                                                </select>

                                                <label>Quantité:</label>
                                                <input type="number" value={panier.quantite} onChange={(e) => handleInputChange(index, 'quantite', e.target.value)} required />

                                                <button type="button" onClick={() => handleRemovePanier(index)}>Supprimer</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={handleAddPanier}>Ajouter un Panier</button>

                                        <button type="submit">Enregistrer la Commande</button>

                                    </div></div>
                            </form>
                        </div>
                    </div></div>
            </main >
        </div >


    );
}

export default AddCommande