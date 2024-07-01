import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getClient } from '../../services/servise'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link } from 'react-router-dom';
const Client = ({ openSidebarToggle, OpenSidebar }) => {

   
   


    const [Clients, setClients] = useState([])

    useEffect(() => {
        let mount = true
        getClient().then(res => {
            console.log("res from api", res)
            setClients(res)
            return () => mount = false
        })
    }, []);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_client/`);
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
                <Link to="/addclient"  className="btn btn-success">
        <i className="material-icons"> &#xE147;</i> <span>Add </span>
        </Link>

                    <div className='containerT'>
                        <h2 className='text-center'>Liste Clients</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Nom client</th>
                                    <th>Prenom client</th>
                                    <th>Adresse mail</th>
                                    <th>Numero telephone</th>
                                    <th>Addresse
                                    </th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Clients?.map(client => {
                                    return (<tr key={client.id}>
                                        <td >{client.nom}
                                        </td>
                                        <td> {client.prenom}</td>
                                        <td>{client.email}</td>
                                        <td>{client.telephone}</td>
                                        <td>{client.address}</td>
                                        <td>
    <a href="#editEmployeeModal-{{forloop.counter}}" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a></td>
    <button className="delete" onClick={() => handleDelete(client.id)}>Delete</button> 
    <button className="delete" ><Link to={`/modifclient/${client.id}`}>Modif</Link></button>
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

export default Client