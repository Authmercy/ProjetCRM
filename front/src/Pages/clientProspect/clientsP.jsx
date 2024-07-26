import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getClientProspect } from '../../services/servise'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link } from 'react-router-dom';
const ClientPropect = ({ openSidebarToggle, OpenSidebar }) => {

   
   


    const [ClientProspects, setClientProspects] = useState([])

    useEffect(() => {
        let mount = true
        getClientProspect().then(res => {
            console.log("res from api", res)
            setClientProspects(res)
            return () => mount = false
        })
    }, []);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_clientP/`);
          window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };
      const [pClients, setpClients] = useState([])
      const [query, setQuery] = useState('');
      useEffect(() => {
        if (query.length > 0) {
            fetch(`http://localhost:8000/api/pclients/search/?name=${query}`)
                .then(response => response.json())
                .then(data => setpClients(data))
                .catch(error => console.error('Error fetching clients:', error));
        } else {
            setpClients([]);
        }
    }, [query]);

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>

                <div className="contenu">
                <Link to="/addclientp"  className="btn btn-success">
        <i className="material-icons"> </i> <span>Add </span>
        </Link>
        <div className="recherche">
                 <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un prospect"
                
            />
                </div >

<table className='table table-bordered table-striped'>
                           
                            <tbody>
                                {pClients?.map(client => {
                                    return (<tr key={client.id}>
                                        <td >{client.nom}
                                        </td>
                                        <td> {client.prenom}</td>
                                        <td>{client.email}</td>
                                        <td>{client.telephone}</td>
                                        <td>{client.address}</td>
                                        
    
                                        <td> <button className="edite" ><Link to={`/modifclient/${client.id}`}>Modif</Link></button>
                       <button className="delete" onClick={() => handleDelete(client.id)}>Delete</button> </td>

    
    </tr>)
                                }
                                )
                                }
                            </tbody>
                        </table>

                    <div className='containerT'>
                        <h2 className='text-center'>Liste Des Prospects</h2>
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
                                {ClientProspects?.map(client => {
                                    return (<tr key={client.id}>
                                        <td >{client.nom}
                                        </td>
                                        <td> {client.prenom}</td>
                                        <td>{client.email}</td>
                                        <td>{client.telephone}</td>
                                        <td>{client.address}</td>
                                        
    
                                        <td> <button className="edite" ><Link to={`/modifclientP/${client.id}`}>Modif</Link></button>
                       <button className="delete" onClick={() => handleDelete(client.id)}>Delete</button> </td>

    
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

export default ClientPropect