const path = require('path');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');
const sharp = require('sharp');

const PORT = process.env.PORT || 3001;
const app = express();

const corsOptions = {
  origin: ['https://casamiento-bce227035385.herokuapp.com', 'http://localhost:3000'], // Your frontend URLs
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the client's build directory
const buildPath = path.resolve(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
} else {
  console.log('The "build" folder of the client does not exist.');
}

// Serve static files from the public directory
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

// Endpoint to get data from Google Sheets
app.get('/api', async (req, res) => {
  console.log('Accessing /api'); // Log for debugging
  try {
    // Google authentication configuration using service account JSON file
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'credentials.json'), // Replace with the actual path
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
    console.error('Error in /api:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to handle form submissions and add data to Google Sheets
app.post('/addData', async (req, res) => {
  try {
    const { nombre, apellido, comida, cancion } = req.body;

    // Google authentication configuration using service account JSON file
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'credentials.json'), // Replace with the actual path
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1Wk0Cof5tloLvtPaZ8w9xrKe61-YSpxHZPSrR7_nDUOc';

    // Append the data to the Google Sheet
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'casamiento!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [nombre, apellido, comida, cancion]
        ],
      },
    });

    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error in /addData:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to optimize images
app.get('/optimized-images/:filename', async (req, res) => {
  const { filename } = req.params;
  const inputPath = path.join(__dirname, '../client/public/assets', filename);

  try {
    const image = await sharp(inputPath)
      .resize({ width: 800 }) // Resize the image
      .webp({ quality: 80 }) // Convert to WebP format with 80% quality
      .toBuffer();

    res.type('image/webp');
    res.send(image);
  } catch (error) {
    console.error('Error optimizing image:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
