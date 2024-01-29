import axios from "axios";

import { API_URL } from "./config_url";

import { config_token } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/marque'

export const listMarque = () => axios.get(REST_API_BASE_URL+'/all',config_token);

export const creaMarque = (marque) => axios.post(REST_API_BASE_URL+'/create',marque,config_token);

export const getByIdMarque = (marqueId) => axios.get(REST_API_BASE_URL + '/' + marqueId,config_token);

export const deleteMarque = (marqueId) => axios.delete(REST_API_BASE_URL + '/' + marqueId,config_token);