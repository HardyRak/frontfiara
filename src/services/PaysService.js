import axios from "axios";

import { API_URL } from "./config_url";

import { config_token } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/pays'

export const listPays = () => axios.get(REST_API_BASE_URL+'/all',config_token);

export const creaPays = (pays) => axios.post(REST_API_BASE_URL,pays,config_token);

export const getByIdPays = (paysId) => axios.get(REST_API_BASE_URL + '/' + paysId,config_token);

export const deletePays = (paysId) => axios.delete(REST_API_BASE_URL + '/delete/' + paysId,config_token);