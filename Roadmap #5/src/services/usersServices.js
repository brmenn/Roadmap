const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_PATH = path.join(__dirname, '../../users.json');

function loadUsers() {
    if (!fs.existsSync(USERS_PATH)) {
        fs.writeFileSync(USERS_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_PATH, 'utf8');
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function createUser(name, email, password) {
    const users = loadUsers();

    const exists = users.find(u => u.email === email);
    if (exists) {
        throw new Error('Email already registered');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    return newUser;
}

function findUserByEmail(email) {
    const users = loadUsers();
    return users.find(u => u.email === email);
}

function findUserById(id) {
    const users = loadUsers();
    return users.find(u => u.id === id);
}

module.exports = { loadUsers, saveUsers, createUser, findUserByEmail, findUserById };