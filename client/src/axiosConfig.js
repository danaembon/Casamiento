// axios.js

import axios from 'axios';
// Asegúrate de ajustar la ruta según tu estructura de archivos

const instance = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 3001}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
