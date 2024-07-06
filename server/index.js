const path = require('path');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();


// Aplicar CORS a todas las rutas
app.use(cors(corsOptions));

// Manejar específicamente las solicitudes OPTIONS
app.options('*', cors(corsOptions));

app.use(express.json());

// Serve static files from the client's build directory
const buildPath = path.resolve(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
} else {
  console.log('The "build" folder of the client does not exist.');
}

// Endpoint para obtener datos desde Google Sheets
app.get('/api', async (req, res) => {
  console.log('Accessing /api'); // Log de depuración
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
