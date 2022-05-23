const router = require('express').Router();
const TasksController = require('../controllers/TasksController');

router.get('/', TasksController.getAllTasks);

router.post('/', TasksController.saveTask);

router.put('/', TasksController.updateTask);

router.delete('/:id', TasksController.deleteTask);

module.exports = router;