const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/checkEmail', UserController.validateEmailAvailibility);

router.post('/register', UserController.registerUser);

router.post('/login', UserController.authenticateUser);

module.exports = router;