const path = require('path');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware CORS
const corsOptions = {
  origin: 'https://casamiento-bce227035385.herokuapp.com', // Reemplaza con el origen correcto de tu frontend
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  optionsSuccessStatus: 200, // Código de respuesta para opciones preflight exitosas
};
app.use(cors(corsOptions));

app.use(express.json());

// Ruta para servir archivos estáticos desde el directorio 'build' del cliente
const buildPath = path.resolve(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
} else {
  console.log('La carpeta "build" del cliente no existe.');
}

// Endpoint para obtener datos desde Google Sheets
app.get('/api', async (req, res) => {
  console.log('Accediendo a /api'); // Log de depuración
  try {
    // Configuración de autenticación con Google usando archivo JSON de cuenta de servicio
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'credentials.json'), // Reemplaza con la ruta real
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1Wk0Cof5tloLvtPaZ8w9xrKe61-YSpxHZPSrR7_nDUOc';

    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'casamiento!A:C',
    });

    res.json(getRows.data);
  } catch (error) {
    console.error('Error en /api:', error.message, error.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para servir index.html para todas las otras rutas
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.post('/addData', async (req, res) => {
  console.log('Recibiendo datos en /addData:', req.body);
  try {
    const { nombre, apellido, comida } = req.body;

    // Usa la misma configuración de autenticación que ya tienes
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'credentials.json'),
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1Wk0Cof5tloLvtPaZ8w9xrKe61-YSpxHZPSrR7_nDUOc';

    // Añadir los nuevos datos a la hoja
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'casamiento!A:C', // Asegúrate de que este rango sea correcto
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[nombre, apellido, comida]]
      }
    });

    res.status(200).json({ message: 'Datos agregados exitosamente' });
  } catch (error) {
    console.error('Error al agregar datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://casamiento-bce227035385.herokuapp.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});