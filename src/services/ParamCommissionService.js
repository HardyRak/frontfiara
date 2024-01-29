import axios from "axios";

import { API_URL } from "./config_url";


import { config_token } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/paramCommission'

export const listParamCommissionne = () => axios.get(REST_API_BASE_URL,config_token);

export const creaParamCommission = (paramCommission) => axios.post(REST_API_BASE_URL,paramCommission,config_token);

export const getByIdParamCommission = (paramCommissionId) => axios.get(REST_API_BASE_URL + '/' + paramCommissionId,config_token);

export const deleteParamCommission = (paramCommissionId) => axios.delete(REST_API_BASE_URL + '/' + paramCommissionId,config_token);

export const updateParamCommission = (paramCommissionId,paramCommission) =>axios.put(REST_API_BASE_URL + '/' + paramCommissionId, paramCommission,config_token); 