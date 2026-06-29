const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = path.join(__dirname, 'data.json');

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
        console.log('File content:');
        console.log(data);
    } catch (err) {
        console.error('Error reading file:', err);
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
        console.log(`Data written: ${task} = ${state}`);
    } catch (err) {
        console.error('Error writing to file:', err);
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
        console.log('Data cleared.');
    } catch (err) {
        console.error('Error clearing data:', err);
    }
}
//=======================================//

// function untuk menampilkan prompt ke command line 
function promptUser() {
    console.log('\nAvailable commands:');
    console.log('1. check task - Read task');
    console.log('2. write task - Write new task');
    console.log('3. update task - Update task state');
    console.log('4. clear data - Clear all data');
    console.log('5. exit - Exit the program');

    // function readline buat logic input user via command line
    rl.question('Enter a command (check/write/update/clear/exit): ', (command) => {
        if (command === '1') {
            readData();
            promptUser();
        } else if (command === '2') {
            rl.question('Enter a task: ', (task) => {
                writeData(task, "Belom dikerjain");
                promptUser();
            });
        } else if (command === '3') {
            readData();
            rl.question('Enter a task name: ', (task) => {
                rl.question('Enter a new task state: ', (state) => {
                    writeData(task, state);
                    promptUser();
                });
            });
        } else if (command === '4') {
            clearData();
            promptUser();
        } else if (command === '5') {
            rl.close();
        } else {
            console.log('Invalid command.');
            promptUser();
        }
    });
}
//=======================================//


promptUser(); // pemanggilan function untuk start prompt logic
