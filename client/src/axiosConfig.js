import axios from 'axios';
import { PORT } from '../../server';

// Creamos una instancia de Axios con la configuración base
const instance = axios.create({
  baseURL: PORT,
  timeout: 5000, // Timeout de 5 segundos
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido JSON por defecto
  },
});

export default instance;
