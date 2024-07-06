const path = require('path');
const express = require("express");
const { google } = require("googleapis");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1Wk0Cof5tloLvtPaZ8w9xrKe61-YSpxHZPSrR7_nDUOc";

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "casamiento!A:C",
    });

    res.json(getRows.data);
  } catch (error) {
    console.error('Error en /api:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});