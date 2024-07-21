import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { getCategory } from '../../services/servise'
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddProduit = ({ openSidebarToggle, OpenSidebar }) => {
 const [description, setDescription] = useState("");
    const [nomProduit, setNomProduit] = useState("");
    const [quantite, setQuantite] = useState("");
    const [prix, setPrix] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_produit/", {
                nomProduit,
                description,
                quantite,
                prix,
                category_id: category,
            });
            navigate("/produit");
            alert("Produit ajouté avec success");
        } catch (error) {
            console.error(error);
        }
    };

    const [Categorys, setCategorys] = useState([])

    useEffect(() => {
        let mount = true
        getCategory().then(res => {
            console.log("res from api", res)
            setCategorys(res)
            return () => mount = false
        })
    }, []);

   


    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">

                    
                <div className='containerD'>
                        <header>Ajouter un Produit</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Nom Produit</label>
                                            <input type='text' id='nom' value={nomProduit} onChange={(event) => setNomProduit(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Description</label>
                                            <input type='text' id='nom' value={description} onChange={(event) => setDescription(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='adressemail'>Quantite</label>
                                            <input type='number'  value={quantite} onChange={(event) => setQuantite(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Prix</label>
                                            <input type='text' id='telephone' value={prix} onChange={(event) => setPrix(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='numerotel'>Categorie</label>
                                            <select className="form-control" value={category} onChange={(event) => setCategory(event.target.value)} id="category" name=" Category">
                        <option > Selectionner  une Category</option>
                        {Categorys.map((element,index) => (
                          <option key={index} value={element.id}>{element.nomCategory}</option>
                        ))}
                      </select>
                                        </div>

                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Enregistrer le produit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
                </div>
            </main >
        </div >
    

    );
}

export default AddProduit