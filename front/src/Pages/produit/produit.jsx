
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getProduit } from '../../services/servise'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link } from 'react-router-dom';
import './/pro.css'
const Produit = ({ openSidebarToggle, OpenSidebar }) => {




    const [Produits, setProduits] = useState([])

    useEffect(() => {
        let mount = true
        getProduit().then(res => {
            console.log("res from api", res)
            setProduits(res)
            return () => mount = false
        })
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/${id}/delete_produit/`);
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
                    <Link to="/addproduit" className="btn btn-success">
                        <i className="material-icons"> &#xE147;</i> <span>Add </span>
                    </Link>
                    <div className='containerT'>
                        <h2 className='text-center'>Liste  des Produits</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Nom </th>
                                    <th>Description</th>
                                    <th>Quantité</th>
                                    <th>Prix Unitaire</th>
                                    <th>Category </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Produits?.map(item => {
                                    return (<tr key={item.id}>
                                        <td >{item.nomProduit}</td>
                                        <td> {item.description}</td>
                                        <td>{item.quantite}</td>
                                        <td>{item.prix}</td>
                                        <td>{item.category.nomCategory}</td>
                                        
                                           
                                        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                        <button className="edite" ><Link to={`/modifproduit/${item.id}`}>Modif</Link></button> </tr>
                                    )
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

export default Produit