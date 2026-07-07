// Import Framework Express

const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Import logic CRUD dari function biar lebih rapih
const { readData, writeData, clearData } = require('./function');
require('dotenv').config();

// Import logic auth juga di auth.js biar keliatan lebih rapih
const { loginUser, authenticateToken } = require('./auth');

const filePath = path.join(__dirname, 'data.json');

// Pengecekan File, Kalau ngga ada langsung di create file baru
if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    console.log('Creating a new file...');
    fs.writeFileSync(filePath, JSON.stringify({}), 'utf8');
}
//=======================================/

const app = express();
app.use(express.json());



// Gunakan middleware untuk semua endpoint API kecuali login
app.use('/api', authenticateToken);



// Endpoint untuk login
app.post('/auth', loginUser);

// endpoint buat ngecek API
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

// endpoint buat baca data
app.get('/api/read', (req, res) => {
    const data = readData();
    res.status(200).json({ data: JSON.parse(data) });
});

// endpoint buat nulis data
app.post('/api/create', (req, res) => {
    const { task, state } = req.body;
    if (!task || !state) {
        return res.status(400).json({ error: 'Task and state are required.' });
    }
    const result = writeData(task, state);
    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }
    res.status(200).json({ message: `Data created: ${task} = ${state}` });
});

// endpoint buat update data
app.post('/api/update', (req, res) => {
    const { task, state } = req.body;
    if (!task || !state) {
        return res.status(400).json({ error: 'Task and state are required.' });
    }
    const result = writeData(task, state);
    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }
    res.status(200).json({ message: `Data updated: ${task} = ${state}` });
});

// endpoint buat clear data
app.delete('/api/clear', (req, res) => {
    const result = clearData();
    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }
    res.status(200).json({ message: result });
});


//=======================================//


app.listen(3000, () => {
    console.log('API server is running on port 3000');
});
