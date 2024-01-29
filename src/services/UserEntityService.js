import axios from "axios";

import { API_URL } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/public'

class UserEntityService {
  login(loginDto) {
    return axios.post(`${REST_API_BASE_URL}/login`, loginDto);
  }

  register(registerDto) {
    return axios.post(`${REST_API_BASE_URL}/register`, registerDto);
  }
}

export default new UserEntityService();