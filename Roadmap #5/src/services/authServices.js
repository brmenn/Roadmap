const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { findUserByEmail } = require('./usersServices');

function jwtSign(payload) {
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    return jsonwebtoken.sign(payload, secretKey, options);
}

function verifyToken(token) {
    const secretKey = process.env.JWT_SECRET;
    return jsonwebtoken.verify(token, secretKey);
}

function loginUser(email, password) {
    const user = findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = jwtSign({ id: user.id, email: user.email });
    return { user, token };
}

module.exports = { jwtSign, verifyToken, loginUser };