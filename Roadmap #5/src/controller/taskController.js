const { createTask, getAllTasks, getTaskByIndex, updateTask, deleteTask } = require('../services/tasksService');

function create(req, res) {
    try {
        const { title, description } = req.body;
        const task = createTask(title, description, req.user.id);
        res.status(201).json({ message: 'Task created', task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

function getAll(req, res) {
    const tasks = getAllTasks(req.user.id);
    res.json(tasks);
}

function getOne(req, res) {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Index must be a number.' });
    }

    const task = getTaskByIndex(index, req.user.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    res.json(task);
}

function update(req, res) {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Index must be a number.' });
    }

    const task = updateTask(index, req.user.id, req.body);
    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ message: 'Task updated', task });
}

function remove(req, res) {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index)) {
        return res.status(400).json({ error: 'Index must be a number.' });
    }

    const task = deleteTask(index, req.user.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ message: 'Task deleted', task });
}

module.exports = { create, getAll, getOne, update, remove };