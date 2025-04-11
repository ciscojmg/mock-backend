const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

function sendMock(res, endpointFolder, mode = 'success', delay = 300) {
    const filePath = path.join(__dirname, 'data', endpointFolder, `${mode}.json`);
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
      if (err) {
        console.warn(`[WARN] File not found: ${filePath}`);
        return res.status(404).json({ error: 'Mock response not found' });
      }
  
      const data = JSON.parse(jsonData);
  
      setTimeout(() => {
        if (mode === 'error') {
          return res.status(500).json(data);
        }
  
        // ✅ ENVÍA la data tal como está escrita en el archivo .json
        res.json(data);
      }, delay);
    });
}

// return this._http.get<any>('http://localhost:3001/api/logs/feeding-reports?mode=success');
app.get('/api/logs/feeding-reports', (req, res) => {
  const mode = req.query.mode || 'success'; 
  sendMock(res, 'feeding-reports', mode, 1000);
});

// Puedes repetir para otros endpoints si deseas:
app.get('/api/device/status', (req, res) => {
  const mode = req.query.mode || 'success';
  sendMock(res, 'device-status', mode);
});

app.listen(port, () => {
  console.log('Mock server running on http://localhost:3001');
});
