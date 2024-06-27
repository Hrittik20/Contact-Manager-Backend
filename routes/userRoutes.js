const express = require('express');
const { loginUser, registerUser, getUserProfile } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/profile', validateToken, getUserProfile);


module.exports = router;