import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getVente } from '../../services/servise'
import axios from 'axios';
import './vente.css'
const Ventes = ({ openSidebarToggle, OpenSidebar })  => {


    const [VVentes, setVVentes] = useState([])
    const [Ventes, setVentes] = useState([])
    const [query, setQuery] = useState('');
      
    useEffect(() => {
      if (query.length > 0) {
          fetch(`http://localhost:8000/api/vente/search/?name=${query}`)
              .then(response => response.json())
              .then(data => setVVentes(data))
              .catch(error => console.error('Error fetching ventes:', error));
      } else {
        setVVentes([]);
      }
  }, [query]);
    useEffect(() => {
        let mount = true
        getVente().then(res => {
            console.log("res from api", res)
            setVentes(res)
            return () => mount = false
        })
    }, []);

    
        const handleDownload = async (id) => {
            try {
                const response = await fetch(`http://localhost:8000/api/vente-pdf/?id=${id}`, {
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
                link.setAttribute('download', `vente_${id}.pdf`);
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
                <div>
                <div className="recherche">
                 <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une vente"
                
            />
                </div >


    <table className='table table-bordered table-striped'>
                            <thead>
                                
                            </thead>
                            <tbody>
        {VVentes.map(item => (
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
                                        <td>  <button onClick={() => handleDownload(item.id)}>  imprimer   </button></td>

        </tr>
                                ))}
                            </tbody>
                        </table>
    </div>





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
                                    <th>Action</th>
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
                                        <td>  <button onClick={() => handleDownload(item.id)}>  imprimer </button></td>

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