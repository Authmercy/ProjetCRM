import axios from "axios"
export async function getClient() {
    const res = await axios.get("http://127.0.0.1:8000/api/clientList/");
    return res.data
}
export async function getClientProspect() {
    const res = await axios.get("http://127.0.0.1:8000/api/clientListP/");
    return res.data
}
export async function getProduit()  {
     const res = await axios.get("http://127.0.0.1:8000/api/produitList/");
return res.data
}
export async function getCategory()  {
    const res = await axios.get("http://127.0.0.1:8000/api/categoryList/");
return res.data
}
export async function getVente()  {
    const res = await axios.get("http://127.0.0.1:8000/api/venteList/");
return res.data
}
export async function getCampagne()  {
    const res = await axios.get("http://127.0.0.1:8000/api/campagne_marketingList/");
return res.data
}
export async function getCommande()  {
    const res = await axios.get("http://127.0.0.1:8000/api/commandeList/");
return res.data
}
export async function getServiceClient()  {
    const res = await axios.get("http://127.0.0.1:8000/api/serviceClientList/");
return res.data
}
export async function getGestionnaire()  {
    const res = await axios.get("http://127.0.0.1:8000/api/gestionnaireList/");
    return res.data}
export async function  getProduitCount()  {
    const res = await axios.get("http://127.0.0.1:8000/api/produit/count/");

    return res.data.total_Produits}

export async function  getCampagneCount()  {
  
    const res = await axios.get("http://127.0.0.1:8000/api/campagne/count/");
    return res.data.total_Campagnes
}
export async function  getClientCount()  {
    const res = await axios.get("http://127.0.0.1:8000/api/client/count/");
    return res.data.total_Client}
export async function  getServiceCount()  {
    const res = await axios.get("http://127.0.0.1:8000/api/service/count/");
    return res.data.total_ServiceClient}
export async function  getCommandeCount()  {
    const res = await axios.get("http://127.0.0.1:8000/api/commande/count/");
    return res.data.total_commandes}
export async function  getVenteCount()  {
    const res = await axios.get("http://127.0.0.1:8000/api/vente/count/");
    return res.data.total_Ventes}
