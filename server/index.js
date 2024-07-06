const path = require('path');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the client's build directory
const buildPath = path.resolve(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
} else {
  console.log('The "build" folder of the client does not exist.');
}

// Endpoint to fetch data from Google Sheets
app.get('/api', async (req, res) => {
  console.log('Accessing /api'); // Debugging log
  try {
    // Google authentication setup using service account JSON file
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'cerenditals.json'), // Replace with actual path
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';

    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'casamiento!A:C',
    });

    res.json(getRows.data);
  } catch (error) {
    console.error('Error in /api:', error.message, error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
