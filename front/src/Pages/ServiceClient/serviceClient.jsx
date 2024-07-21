
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getServiceClient } from '../../services/servise'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link } from 'react-router-dom';
import './service.css'
const ServiceClient = ({ openSidebarToggle, OpenSidebar }) => {




    const [ServiceClients, setServiceClients] = useState([])

    useEffect(() => {
        let mount = true
        getServiceClient().then(res => {
            console.log("res from api", res)
            setServiceClients(res)
            return () => mount = false
        })
    }, []);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_serviceClient/`);
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

                    <div className='container'>
                    <button className="contenu">
                    <Link to="/addservice"  className="btn btn-success">
        <i className="material-icons"> &#xE147;</i> <span>Add </span>
        </Link>
      </button>
                        <h2 className='text-center'>Liste  des Interactions</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Date de demande</th>
                                    <th>Probleme signalé</th>
                                    <th>Client</th>
                                    <th> Gestionnaire</th>
                                    <th> Statut</th>
                                    <th>Action</th>
                                  
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {ServiceClients?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.date_demande}</td>
                                        <td> {item.problemeSignale}</td>
                                        <td> {item.client.nom}</td>
                                        <td> {item.gestionnaire.nom}</td>
                                        <td> {item.statut}</td>
                                        <td>
                                        <button className="edite" ><Link to={`/modifservice/${item.id}`}>Modif</Link></button>
                                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button> </td></tr>)
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

export default ServiceClient