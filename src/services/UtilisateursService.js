import axios from "axios";

import { API_URL } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/utilisateurs'

export const listUtilisateurs = () => axios.get(REST_API_BASE_URL);

export const creaUtilisateurs = (utilisateurs) => axios.post(REST_API_BASE_URL,utilisateurs);


export const getByIdUtilisateurs = (utilisateursId) => axios.get(REST_API_BASE_URL + '/' + utilisateursId);

export const deleteUtilisateurs= (utilisateursId) => axios.delete(REST_API_BASE_URL + '/' + utilisateursId);

export const updateUtilisateurs = (utilisateursId,utilisateurs) =>axios.put(REST_API_BASE_URL + '/' + utilisateursId, utilisateurs); 