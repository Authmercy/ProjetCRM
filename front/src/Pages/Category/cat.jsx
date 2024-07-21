import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCategory } from '../../services/servise'
import Header from '../Home/Header'
import { Link, useNavigate } from "react-router-dom";
import './cat.css'
import Sidebar from '../Home/sidebar'
const Category = ({ openSidebarToggle, OpenSidebar }) => {



  
    const [Categorys, setCategorys] = useState([])

    useEffect(() => {
        let mount = true
        getCategory().then(res => {
            console.log("res from api", res)
            setCategorys(res)
            return () => mount = false
        })
    }, []);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/${id}/delete_category/`);
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
                <Link to="/addcat"  className="btn btn-success">
        <i className="material-icons"> &#xE147;</i> <span>Add </span>
        </Link>
                    <div className='containerT'>
                        <h2 className='text-center'>Liste  des Categories</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Nom </th>
                                    <th>Description</th>
                                  
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Categorys?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.nomCategory}</td>
                                        <td> {item.description}</td>
                                        
                                        
                                            
                                        <button className="edite" ><Link to={`/modifcat/${item.id}`}>Modif</Link></button>
                                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                            
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

export default Category