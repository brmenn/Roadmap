const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { validateTask, validateTaskUpdate } = require('../middleware/taskMiddleware');
const { create, getAll, getOne, update, remove } = require('../controller/taskController');

router.use(authenticate);

router.post('/', validateTask, create);
router.get('/', getAll);
router.get('/:index', getOne);
router.put('/:index', validateTaskUpdate, update);
router.delete('/:index', remove);

module.exports = router;