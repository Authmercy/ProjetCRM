
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCommande } from '../../services/servise'
import Header from '../Home/Header'
import { Link } from 'react-router-dom';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Home/sidebar'
const Commande = ({ openSidebarToggle, OpenSidebar }) => {
    const [Commandes, setCommandes] = useState([]);
    const [query, setQuery] = useState('');
    const [Ccommandes, setCcommandes] = useState([]);
      useEffect(() => {
        if (query.length > 0) {
            fetch(`http://localhost:8000/api/commande/search/?name=${query}`)
                .then(response => response.json())
                .then(data => setCcommandes(data))
                .catch(error => console.error('Error fetching Commandes:', error));
        } else {
            setCcommandes([]);
        }
    }, [query]);
    useEffect(() => {
        let mount = true;
        getCommande().then(res => {
            console.log("res from api", res);
            setCommandes(res);
            return () => mount = false;
        });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/${id}/delete_commande/`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const handleDownload = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/commande-pdf/?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erreur');
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `bon_commande_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };
 

    return (
        <div className='grid-container'>
         
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">
                    <Link to="/addcommande" className="btn btn-success">
                        <i className="material-icons"> </i> <span>Add </span>
                    </Link>


                    <div className="recherche">
                 <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une commande"
                
            />
                </div >
                    <table className='table table-bordered table-striped'>
                            
                          
                            <tbody>
                                {Ccommandes?.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.client.nom}</td>
                                       
                                        <td>
                                            {item.paniers.map(panier => (
                                                <div key={panier.id}>
                                                    {panier.produit.nomProduit} - Quantité: {panier.quantite} - Prix unitaire: {panier.produit.prix} Total : {panier.total}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{item.total_quantite}</td>
                                        <td>{item.total_prix}</td>
                                        <td>{item.date_fin}</td>
                                        <td>{item.statut}</td>
                                        <td>
                                            <button className="edite"><Link to={`/modifcommande/${item.id}`}>Modif</Link></button>
                                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                            
                                            <button onClick={() => handleDownload(item.id)}>imprimer </button>
            
       
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    <div className='containerT'>
                        <h2 className='text-center'>Liste des Commandes</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Numero Commande</th>
                                    <th>Client</th>
                                    <th>Produit</th>
                                    <th>Qte Total</th>
                                    <th>Prix Total</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Commandes?.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.client.nom}</td>
                                       
                                        <td>
                                            {item.paniers.map(panier => (
                                                <div key={panier.id}>
                                                    {panier.produit.nomProduit} - Quantité: {panier.quantite} - Prix unitaire: {panier.produit.prix} Total : {panier.total}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{item.total_quantite}</td>
                                        <td>{item.total_prix}</td>
                                        <td>{item.date_fin}</td>
                                        <td>{item.statut}</td>
                                        <td>
                                            <button className="edite"><Link to={`/modifcommande/${item.id}`}>Modif</Link></button>
                                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                            <button onClick={() => handleDownload(item.id)}>
            imprimer
        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}


export default Commande