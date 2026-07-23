const fs = require('fs');
const path = require('path');
const { findUserById } = require('./usersServices');

const DB_PATH = path.join(__dirname, '../../database.json');

function loadTasks() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
}

function createTask(title, description, userId) {
    const user = findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const tasks = loadTasks();
    const newTask = {
        owner_id: userId,
        title,
        description,
        status: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

function getAllTasks(userId) {
    const tasks = loadTasks();
    return tasks.filter(t => t.owner_id === userId);
}

function getTaskByIndex(index, userId) {
    const tasks = loadTasks();
    const userTasks = tasks.filter(t => t.owner_id === userId);
    if (index < 0 || index >= userTasks.length) {
        return null;
    }
    return userTasks[index];
}

function updateTask(index, userId, updates) {
    const tasks = loadTasks();
    const userTasks = tasks.filter(t => t.owner_id === userId);

    if (index < 0 || index >= userTasks.length) {
        return null;
    }

    const task = userTasks[index];
    const globalIndex = tasks.indexOf(task);

    if (updates.title !== undefined) tasks[globalIndex].title = updates.title;
    if (updates.description !== undefined) tasks[globalIndex].description = updates.description;
    if (updates.status !== undefined) tasks[globalIndex].status = updates.status;
    tasks[globalIndex].updated_at = new Date().toISOString();

    saveTasks(tasks);
    return tasks[globalIndex];
}

function deleteTask(index, userId) {
    const tasks = loadTasks();
    const userTasks = tasks.filter(t => t.owner_id === userId);

    if (index < 0 || index >= userTasks.length) {
        return null;
    }

    const task = userTasks[index];
    const globalIndex = tasks.indexOf(task);
    const deleted = tasks.splice(globalIndex, 1)[0];

    saveTasks(tasks);
    return deleted;
}

module.exports = { createTask, getAllTasks, getTaskByIndex, updateTask, deleteTask };