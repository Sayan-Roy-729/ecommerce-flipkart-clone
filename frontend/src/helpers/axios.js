import axios from 'axios';

import * as api from '../urlConfig';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: api.api,
  headers: {
    'Authorization': token ? `Bearer ${token}` : '',
  }
});

export default axiosInstance;