const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;
