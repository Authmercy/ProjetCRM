import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginForm/Login'
import Accueil from './Pages/Home/Accueil'
import Sidebar from './Pages/Home/sidebar'
import Client from './Pages/Clients/clients'
import Produit from './Pages/produit/produit'
import Ventes from './Pages/Vente/ventes'
import Gestionnaires from './Pages/Gestionnaire/Ges';
import ServiceClient from  './Pages/ServiceClient/serviceClient';
import Campagne from './Pages/Campagne/campagne'
import Commande from './Pages/Commande/commande';
import AddCommande from './Pages/Commande/addComande';
import AddClient from './Pages/Clients/addClient'
import AddProduit from './Pages/produit/addProduit'
import AddCategory from './Pages/Category/addCat'
import Category from './Pages/Category/cat'
import AddGestionnaire from './Pages/Gestionnaire/addGest';
import AddCampagne from './Pages/Campagne/addCampagnes';
import  AddServiceClient from  './Pages/ServiceClient/addServiceClient';
import UpdateCommande from './Pages/Commande/modifCommande';
import UpdateClient from './Pages/Clients/modifClient'
import UpdateProduit from './Pages/produit/modifProduit'
import UpdateCategory from './Pages/Category/modifCat'
import UpdateGestionnaire from './Pages/Gestionnaire/modifGes';
import UpdateCampagne from './Pages/Campagne/modifierCampagne';
import UpdateServiceClient from  './Pages/ServiceClient/modifServiceClient';
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (


    <Router>
      <Routes>
      <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/campagne" element={<Campagne />} />
        <Route path="/vente" element={<Ventes />} />
        <Route path="/commade" element={<Commande />} />
        <Route path="/cat" element={<Category />} />
        <Route path="/produit" element={<Produit />} /> 
        <Route path="/ges" element={<Gestionnaires />} />
        <Route path="/service" element={<ServiceClient />} />
        <Route path="/client" element={<Client />} />
        <Route path="/addcampagne" element={<AddCampagne />} />
        <Route path="/addges" element={<AddGestionnaire />} />
        <Route path="/addproduit" element={<AddProduit />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/addcat" element={<AddCategory />} />
        <Route path="/addservice" element={<AddServiceClient />} />
        <Route path="/addcommande" element={<AddCommande />} />
        <Route path="/modifcampagne/:id" element={<UpdateCampagne />} />
        <Route path="/modifges/:id" element={<UpdateGestionnaire />} />
        <Route path="/modifproduit/:id" element={<UpdateProduit />} />
        <Route path="/modifclient/:id" element={<UpdateClient />} />
        <Route path="/modifcat/:id" element={<UpdateCategory />} />
        <Route path="/modifservice/:id" element={<UpdateServiceClient />} />
        <Route path="/modifcommande/:id" element={<UpdateCommande />} />
       
      </Routes>
    </Router>
  )
}

export default App