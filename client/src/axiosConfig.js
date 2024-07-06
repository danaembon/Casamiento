import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || `http://localhost:${process.env.PORT || 3001}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
