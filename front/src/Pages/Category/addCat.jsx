import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'

const AddCategory = ({ openSidebarToggle, OpenSidebar }) => {
 const [description, setDescription] = useState("");
    const [nomCategory, setNomCategory] = useState("");
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_category/", {
                nomCategory,
                description,
               
            });
            alert("Categorie ajouté avec success");
        } catch (error) {
            console.error(error);
        }
    };


   


    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <main className='main-container'>
                <div className="contenu">

                    
                <div className='containerD'>
                        <header>Ajouter une Categorie</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Ajouter une Categorie</span>
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

export default AddCategory