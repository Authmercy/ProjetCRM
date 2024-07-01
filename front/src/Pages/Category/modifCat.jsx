import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateCategory = ({ openSidebarToggle, OpenSidebar }) => {
    const [description, setDescription] = useState("");
    const [nomCategory, setNomCategory] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const location = useLocation();
    const catId = location.pathname.split("/")[2];


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/${catId}/update_category/`, {
                nomCategory,
                description,

            });
            navigate("/cat");
            alert("Categorie ajouté avec success");
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };





    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">


                    <div className='containerD'>
                        <header>Modifier une Categorie</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Modifier une Categorie</span>
                                    </div>

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Nom Categorie</label>
                                            <input type='text' id='nom' value={nomCategory} onChange={(event) => setNomCategory(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Description</label>
                                            <input type='text' id='nom' value={description} onChange={(event) => setDescription(event.target.value)} required />
                                        </div>


                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Enregistrer la Categorie</button>
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

export default UpdateCategory