const express = require('express');
const { createTask, getTask, deleteTask, updateTask, getCompleted, getThing, getAllTask, } = require('../controllers/task');
const checkLogin = require('../milldlewares/checkLogin');


const router = express.Router();

router.post('/', checkLogin, createTask);
router.get('/allTask', checkLogin, getAllTask);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

// router.get('/complete', getCompleted);

// router.get('/find', getThing);


module.exports = router;