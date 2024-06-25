const path = require('path');
const express = require("express");
const { google } = require("googleapis")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", async (req, res) => {
    

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
})

const client = await auth.getClient()

const googleSheets = google.sheets({ version: "v4", auth: client })

const spreadsheetId = "1Wk0Cof5tloLvtPaZ8w9xrKe61-YSpxHZPSrR7_nDUOc"

const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
})

const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "casamiento!A:C",

})

await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "casamiento!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
        values: [
            []
        ]
    }
})
res.json({message: "Hola desde el servidor"})
res.send(getRows.data)
  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});