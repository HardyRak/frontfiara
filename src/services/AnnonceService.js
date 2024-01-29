import axios from 'axios';
import { API_URL } from "./config_url";
import { config_token } from "./config_url";



const user =localStorage.getItem("userId"); // Enregistre le token dans le localStorage

const AnnonceService = {
  saveAnnonce: (annonce) => {
    return axios.post(`${API_URL}/api/annonce/save`, annonce, config_token);
  },
  
  getAllAnnonces: () => {
    return axios.get(`${API_URL}/api/annonce/all`);
  },
  getAllAnnoncesFilter: () => {
    return axios.get(`${API_URL}/api/favoris/${user}`,config_token);
  }
};

export default AnnonceService;