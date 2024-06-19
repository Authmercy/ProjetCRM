
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCommande } from '../../services/servise'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
const Commande = ({ openSidebarToggle, OpenSidebar }) => {




    const [Commandes, setCommandes] = useState([])

    useEffect(() => {
        let mount = true
        getCommande().then(res => {
            console.log("res from api", res)
            setCommandes(res)
            return () => mount = false
        })
    }, []);
 
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_commande/`);
          window.location.reload()
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

                    <div className='containerT'>
                        <h2 className='text-center'>Liste  des Commandes</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Numero Commande</th>
                                    <th>Client</th>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Action</th>
                                  
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {Commandes?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.id}</td>
                                        <td> {item.nom_client}</td>
                                        <td> {item.nom_produit}</td>
                                        <td> {item.date_fin}</td>
                                        <td> {item.statut}</td>
                                        <td> {item.date_fin}</td>
                                        <td>
                                            <a href="#editEmployeeModal-{{forloop.counter}}" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a></td>
                                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>  </tr>)
                                }
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </main >
        </div >


    )
}

export default Commande