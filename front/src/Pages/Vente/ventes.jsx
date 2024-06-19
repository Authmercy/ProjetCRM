import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import React, { useEffect, useState } from 'react'

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
                                <tr> <th>Numero Vente</th>
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
                                {Ventes?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.idCommande}</td>
                                        <td> {item.nom_client}</td>
                                        <td> {item.nom_produit}</td>
                                        <td> {item.date_fin}</td>
                                        <td> {item.statut}</td>
                                        <td> {item.date_fin}</td>
                                        <td>
                                            <a href="#editEmployeeModal-{{forloop.counter}}" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a></td>
                                    </tr>)
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


export default Ventes