import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getVente } from '../../services/servise'
const Ventes = ({ openSidebarToggle, OpenSidebar })  => {



    const [Ventes, setVentes] = useState([])

    useEffect(() => {
        let mount = true
        getVente().then(res => {
            console.log("res from api", res)
            setVentes(res)
            return () => mount = false
        })
    }, []);


    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">

                    <div className='containerT'>
                        <h2 className='text-center'>Liste  des Ventes</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr><th>Code Vente</th>
                                    <th>Numero Commande</th>
                                    <th>Client</th>
                                    <th>Produit</th>
                                    <th>Qte Total</th>
                                    <th>Prix Total</th>
                                    <th>Date</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                                {Ventes?.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.commande}</td>
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




 


export default Ventes