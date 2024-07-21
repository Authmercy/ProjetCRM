
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCommande } from '../../services/servise'
import Header from '../Home/Header'
import { Link } from 'react-router-dom';
import Sidebar from '../Home/sidebar'
const Commande = ({ openSidebarToggle, OpenSidebar }) => {
    const [Commandes, setCommandes] = useState([]);

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

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">
                    <Link to="/addcommande" className="btn btn-success">
                        <i className="material-icons"> &#xE147;</i> <span>Add </span>
                    </Link>
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