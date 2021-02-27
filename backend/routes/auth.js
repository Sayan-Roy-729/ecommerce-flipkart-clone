const express = require('express');

const validator = require('../middlewares/validator');
const authController = require('../controllers/auth');

const router = express.Router();

// User SignUp => /api/v1/signup [POST]
router.post('/signup', validator.validateRequest, validator.checkValidation ,authController.postSignUp);

// User SignIN => /api/v1/signin [POST]
router.post('/signin', authController.postSignIn);

module.exports = router;
