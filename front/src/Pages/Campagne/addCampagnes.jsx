import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Home/Header';
import Sidebar from '../Home/sidebar';
import { useNavigate } from "react-router-dom";

const AddCampagne = ({ openSidebarToggle, OpenSidebar }) => {
    const [nomCampagne, setNomCampagne] = useState("");
    const [objectif, setObjectif] = useState("");
    const [date_debut, setDate_debut] = useState("");
    const [date_fin, setDate_fin] = useState("");
    const [document, setDocument] = useState(null);
    const [media, setMedia] = useState(null);
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (setter) => (event) => {
        setter(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nomCampagne', nomCampagne);
        formData.append('objectif', objectif);
        formData.append('date_debut', date_debut);
        formData.append('date_fin', date_fin);
        if (document) formData.append('document', document);
        if (media) formData.append('media', media);
        if (video) formData.append('video', video);

        try {
            await axios.post("http://127.0.0.1:8000/api/add_campagne_marketing/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/campagne");
            alert("Campagne ajoutée avec succès");
        } catch (error) {
            console.error(error);
            console.error('Error response data:', error.response?.data);
            alert("La date de fin ne peut pas être antérieure à la date de début.");
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
                                            <label htmlFor='nomclient'>Objectif</label>
                                            <input type='text' id='nom' value={objectif} onChange={(event) => setObjectif(event.target.value)} required />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Date de début</label>
                                            <input type='date' id='nom' value={date_debut} onChange={(event) => setDate_debut(event.target.value)}  />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='nomclient'>Date de fin</label>
                                            <input type='date' id='nom' value={date_fin} onChange={(event) => setDate_fin(event.target.value)}  />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='document'>Document (powerpoint, doc)</label>
                                            <input type='file' id='document' onChange={handleFileChange(setDocument)} />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='media'>Image</label>
                                            <input type='file' id='media' onChange={handleFileChange(setMedia)} />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='video'>Vidéo</label>
                                            <input type='file' id='video' onChange={handleFileChange(setVideo)} />
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
            </main>
        </div>
    );
};

export default AddCampagne;
