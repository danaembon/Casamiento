const path = require('path');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Ruta estática para servir archivos desde casamiento/client/build
const buildPath = path.resolve(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
} else {
  console.log('La carpeta "build" del cliente no existe.');
}

// Ruta para obtener datos desde Google Sheets
app.get('/api', async (req, res) => {
  console.log('Accediendo a /api'); // Log para depuración
  try {
    // Configuración de autenticación de Google
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1Wk0Cof5tloLvtPaZ8w9xrKe61-YSpxHZPSrR7_nDUOc';

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'casamiento!A:C',
    });

    res.json(getRows.data);
  } catch (error) {
    console.error('Error en /api:', error.message, error.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para manejar todas las demás solicitudes y servir el archivo index.html del cliente
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
