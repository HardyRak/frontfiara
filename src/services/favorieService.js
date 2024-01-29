import axios from 'axios';

import { API_URL } from "./config_url";

import { config_token } from "./config_url";

const FavorieService = {
  ajouterAnnonceAuxFavoris: (userId, annonceId) => {
    const token = localStorage.getItem('token'); // Récupérez le token JWT depuis le localStorage

    // Créez l'en-tête d'autorisation pour inclure le token JWT
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Effectuez une requête POST vers l'API pour ajouter l'annonce aux favoris
    return axios.post(
      `${API_URL}/api/favoris/${userId}/annonces/${annonceId}`,
      {},
      { headers }
    );
  },
};

export default FavorieService;