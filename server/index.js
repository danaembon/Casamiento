const path = require('path');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://casamiento-bce227035385.herokuapp.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Aplicar CORS a todas las rutas
app.use(cors(corsOptions));

// Manejar específicamente las solicitudes OPTIONS
app.options('*', cors(corsOptions));

app.use(express.json());

// ... (el resto de tu código permanece igual)

// Mover esta parte al final, justo antes de app.listen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'https://casamiento-bce227035385.herokuapp.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log('CORS Origin:', process.env.CORS_ORIGIN || 'https://casamiento-bce227035385.herokuapp.com');
});