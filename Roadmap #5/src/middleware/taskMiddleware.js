function validateTask(req, res, next) {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required and must be a non-empty string.' });
    }

    next();
}

function validateTaskUpdate(req, res, next) {
    const { title, description, status } = req.body;

    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ error: 'Title must be a non-empty string.' });
    }

    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
        return res.status(400).json({ error: 'Description must be a non-empty string.' });
    }

    if (status !== undefined && typeof status !== 'boolean') {
        return res.status(400).json({ error: 'Status must be a boolean.' });
    }

    next();
}

module.exports = { validateTask, validateTaskUpdate };