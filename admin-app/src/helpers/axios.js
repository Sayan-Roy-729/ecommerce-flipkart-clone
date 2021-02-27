import axios from 'axios';

import * as api from '../urlConfig';

const axiosInstance = axios.create({
  baseURL: api.api,
  // headers: {
  //   'Authorization': ''
  // }
});

export default axiosInstance;