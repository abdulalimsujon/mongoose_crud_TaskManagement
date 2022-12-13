const express = require('express');

const router = express.Router();


const { UserSignup, userLogin } = require('../controllers/user');

router.post('/signup', UserSignup);
router.post('/login', userLogin);



module.exports = router;