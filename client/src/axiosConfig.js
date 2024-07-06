import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',  // Aquí colocas la URL de tu servidor backend
    timeout: 5000,  // Tiempo de espera de 5 segundos
    headers: {
        'Content-Type': 'application/json',  // Tipo de contenido JSON por defecto
    },
});

export default instance;