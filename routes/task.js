const express = require('express');
const { createTask, getTask, deleteTask, updateTask } = require('../controllers/task');

const router = express.Router();

router.post('/', createTask);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;