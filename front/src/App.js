import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginForm/Login'
import Register from './LoginForm/Registration';
import Accueil from './Pages/Home/Accueil'
import Sidebar from './Pages/Home/sidebar'
import Client from './Pages/Clients/clients'
import ClientPropect from './Pages/clientProspect/clientsP';
import Produit from './Pages/produit/produit'
import Ventes from './Pages/Vente/ventes'
import Gestionnaires from './Pages/Gestionnaire/Ges';
import ServiceClient from  './Pages/ServiceClient/serviceClient';
import Campagne from './Pages/Campagne/campagne'
import Commande from './Pages/Commande/commande';
import AddCommande from './Pages/Commande/addComande';
import AddClient from './Pages/Clients/addClient'
import AddClientPropect from './Pages/clientProspect/addClientP';
import AddProduit from './Pages/produit/addProduit'
import AddCategory from './Pages/Category/addCat'
import Category from './Pages/Category/cat'
import AddGestionnaire from './Pages/Gestionnaire/addGest';
import AddCampagne from './Pages/Campagne/addCampagnes';
import  AddServiceClient from  './Pages/ServiceClient/addServiceClient';
import UpdateCommande from './Pages/Commande/modifCommande';
import UpdateClient from './Pages/Clients/modifClient'
import UpdateClientPropect from './Pages/clientProspect/modifClientP';
import UpdateProduit from './Pages/produit/modifProduit'
import UpdateCategory from './Pages/Category/modifCat'
import UpdateGestionnaire from './Pages/Gestionnaire/modifGes';
import UpdateCampagne from './Pages/Campagne/modifierCampagne';
import UpdateServiceClient from  './Pages/ServiceClient/modifServiceClient';
import Search from './Pages/Home/Search';




function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (


    <Router>
      <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/campagne" element={<Campagne />} />
        <Route path="/vente" element={<Ventes />} />
        <Route path="/commade" element={<Commande />} />
        <Route path="/cat" element={<Category />} />
        <Route path="/produit" element={<Produit />} /> 
        <Route path="/ges" element={<Gestionnaires />} />
        <Route path="/service" element={<ServiceClient />} />
        <Route path="/client" element={<Client />} />
        <Route path="/clientP" element={<ClientPropect />} />
        <Route path="/addcampagne" element={<AddCampagne />} />
        <Route path="/addges" element={<AddGestionnaire />} />
        <Route path="/addproduit" element={<AddProduit />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/addclientP" element={<AddClientPropect />} />
        <Route path="/addcat" element={<AddCategory />} />
        <Route path="/addservice" element={<AddServiceClient />} />
        <Route path="/addcommande" element={<AddCommande />} />
        <Route path="/modifcampagne/:id" element={<UpdateCampagne />} />
        <Route path="/modifges/:id" element={<UpdateGestionnaire />} />
        <Route path="/modifproduit/:id" element={<UpdateProduit />} />
        <Route path="/modifclient/:id" element={<UpdateClient />} />
        <Route path="/modifclientP/:id" element={<UpdateClientPropect />} />
        <Route path="/modifcat/:id" element={<UpdateCategory />} />
        <Route path="/modifservice/:id" element={<UpdateServiceClient />} />
        <Route path="/modifcommande/:id" element={<UpdateCommande />} />
       
      </Routes>
    </Router>
  )
  const App = () => {
    return (
        <div>
            <h1>Product Search</h1>
            <Search />
        </div>
    );
};
}

export default App