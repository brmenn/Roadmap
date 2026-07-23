const { createUser } = require('../services/usersServices');
const { loginUser } = require('../services/authServices');

function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        const user = createUser(name, email, password);
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
    } catch (error) {
        if (error.message === 'Email already registered') {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
}

function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const { user, token } = loginUser(email, password);
        const { password: _, ...userWithoutPassword } = user;

        res.json({ message: 'Login successful', user: userWithoutPassword, token });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = { register, login };