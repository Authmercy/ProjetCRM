import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Home/Header'
import Sidebar from '../Home/sidebar'

const AddCampagne = ({ openSidebarToggle, OpenSidebar }) => {
 const [description, setDescription] = useState("");
    const [nomCampagne, setNomCampagne] = useState("");
    const [objectif, setObjectif] = useState("");
    const [date_debut, setDate_debut] = useState("");
    const [date_fin, setDate_fin] = useState("");
    const [document, setDocument] = useState("");
    const [media, setMedia] = useState("");
    const [video, setVideo] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/add_campagne_marketing/", {
                nomCampagne,
               objectif,
               date_debut ,
               date_fin ,
               document,
               media,
               video
               
            });
            alert("Campagne ajouté avec success");
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
                        <header>Ajouter une Campagne</header>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form'>
                                    <div className='details'>
                                        <span className='title'>Ajouter une Campagne</span>
                                    </div>

                                    <div className='fields'>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Nom de la Campagne</label>
                                            <input type='text' id='nom' value={nomCampagne} onChange={(event) => setNomCampagne(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Objective</label>
                                            <input type='text' id='nom' value={objectif} onChange={(event) => setObjectif(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Date de debut</label>
                                            <input type='date' id='nom' value={date_debut} onChange={(event) => setDate_debut(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Date de fin</label>
                                            <input type='date' id='nom' value={date_fin} onChange={(event) => setDate_fin(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Document(powerpoint,doc)</label>
                                            <input type='file' id='nom' value={document} onChange={(event) => setDocument(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Image</label>
                                            <input type='file' id='nom' value={media} onChange={(event) => setMedia(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Video</label>
                                            <input type='file' id='nom' value={video} onChange={(event) => setVideo(event.target.value)} required />
                                        </div>
                                        

                                    </div>
                                    <div className='submit'>
                                        <button type='submit'>Enregistrer la Campagne</button>
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

export default AddCampagne