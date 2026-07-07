const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

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

module.exports =  {
    readData,
    writeData,
    clearData
}
