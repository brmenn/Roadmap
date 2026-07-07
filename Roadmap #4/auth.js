const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading user.json:', err);
        return;
    }
    try {
        const users = JSON.parse(data);
        module.exports.users = users;
    } catch (parseErr) {
        console.error('Error parsing user.json:', parseErr);
    }
});

function readUsers() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'user.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading user.json:', err);
        return [];
    }
}

function loginUser(req, res) {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const users = readUsers();
    // validasi username dan passwword baca dari user.json
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
}

// Middleware untuk memverifikasi token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (!authHeader) {
        return res.status(401).json({ error: 'Access token is missing' });
    }

    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    loginUser,
    authenticateToken
};
