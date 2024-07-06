// axios.js

import axios from 'axios';
import config from '../../server/config';
// Asegúrate de ajustar la ruta según tu estructura de archivos

const instance = axios.create({
  baseURL: config.backendUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
