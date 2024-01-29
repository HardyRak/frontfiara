// messagesService.js
import axios from 'axios';
import { API_URL } from './config_url';
import { config_token } from './config_url';

const REST_API_BASE_URL = API_URL + '/api/';

// Fonction pour envoyer un message
export const envoyerMessage = async (messageDTO) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}messages/envoyer`, messageDTO, config_token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error.response ? error.response.data : error.message);
        throw error;
    }
};
// Fonction pour récupérer les boîtes de messages par propriétaireId
export const getBoiteMessagesByProprietaireId = async (proprietaireId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}messages/proprietaire/${proprietaireId}`, config_token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des boîtes de messages par proprietaireId :', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fonction pour récupérer les boîtes de messages par interlocuteurId
export const getBoiteMessagesByInterlocuteurId = async (interlocuteurId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}messages/interlocuteur/${interlocuteurId}`, config_token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des boîtes de messages par interlocuteurId :', error.response ? error.response.data : error.message);
        throw error;
    }
};

