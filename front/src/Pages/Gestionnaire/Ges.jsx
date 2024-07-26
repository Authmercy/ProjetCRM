import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getGestionnaire } from '../../services/servise'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link } from 'react-router-dom';
import './spges.css'
const Gestionnaires = ({ openSidebarToggle, OpenSidebar }) => {

   
   


    const [Gestionnaires, setGestionnaires] = useState([])

    useEffect(() => {
        let mount = true
        getGestionnaire().then(res => {
            console.log("res from api", res)
            setGestionnaires(res)
            return () => mount = false
        })
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_gestionnaire/`);
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
                <Link to="/addges"  className="btn btn-success">
        <i className="material-icons"> </i> <span>Add </span>
        </Link>
                    <div className='containerT'>
                        <h2 className='text-center'>Liste Gestionnaires</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Nom Gestionnaires</th>
                                    <th>Prenom Gestionnaires</th>
                                    <th>Adresse mail</th>
                                    <th>Numero telephone</th>
                                    <th>Addresse
                                    </th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Gestionnaires?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.nom}
                                        </td>
                                        <td> {item.prenom}</td>
                                        <td>{item.email}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.address}</td>
                                        
    <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>            </tr>)
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

export default Gestionnaires;