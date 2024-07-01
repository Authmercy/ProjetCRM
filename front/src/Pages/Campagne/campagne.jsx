
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCampagne } from '../../services/servise'
import Header from '../Home/Header'
import { Link } from 'react-router-dom';
import Sidebar from '../Home/sidebar'
const Campagne = ({ openSidebarToggle, OpenSidebar }) => {




    const [Campagnes, setCampagnes] = useState([])

    useEffect(() => {
        let mount = true
        getCampagne().then(res => {
            console.log("res from api", res)
            setCampagnes(res)
            return () => mount = false
        })
    }, []);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_campagne_marketing/`);
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
                <Link to="/addcampagne"  className="btn btn-success">
        <i className="material-icons"> &#xE147;</i> <span>Add </span>
        </Link>

                    <div className='containerT'>
                        <h2 className='text-center'>Liste  des Categories</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Nom de la Campagne</th>
                                    <th>Objectif</th>
                                    <th>Date_debut</th>
                                    <th>Date_fin</th>
                                    <th>Action</th>
                                  
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {Campagnes?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.nomCampagne}</td>
                                        <td> {item.objectif}</td>
                                        <td> {item.date_debut}</td>
                                        <td> {item.date_fin}</td>
                                        <td>
                                            <a href="#editEmployeeModal-{{forloop.counter}}" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a></td>
                                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                            <button className="delete" ><Link to={`/modifcampagne/${item.id}`}>Modif</Link></button>  </tr>)
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

export default Campagne