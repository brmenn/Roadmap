// Import Framework Express

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'data.json');

app.use(express.json());
// Pengecekan File, Kalau ngga ada langsung di create file baru
if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    console.log('Creating a new file...');
    fs.writeFileSync(filePath, JSON.stringify({}), 'utf8');
}
//=======================================//

// function buat baca data
function readData() {
    if (!fs.existsSync(filePath)) {
        console.error('File does not exist:', filePath);
        return;
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data
    } catch (err) {
        return err;
    }
}
//=======================================//

// function buat nulis data
function writeData(task, state) {
    if (!fs.existsSync(filePath)) {
        console.error('File does not exist:', filePath);
        return;
    }
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data[task] = state;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return data;
    } catch (err) {
        return err;
    }
}
//=======================================//

// function buat clear data
function clearData() {
    if (!fs.existsSync(filePath)) {
        console.error('File does not exist:', filePath);
        return;
    }
    try {
        fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf8');
        return 'Data cleared.';
    } catch (err) {
        console.error('Error clearing data:', err);
        return err;
    }
}
//=======================================//

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
