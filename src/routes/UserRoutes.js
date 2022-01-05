const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/sign-in',userController.createUser);
router.post('/login',userController.login);


module.exports = router;