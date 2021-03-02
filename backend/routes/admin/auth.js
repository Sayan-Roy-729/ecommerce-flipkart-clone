const express = require('express');

const authController = require('../../controllers/admin/auth');
const authentication = require('../../middlewares/isAuth');
const validation = require('../../middlewares/validator');

const router = express.Router();

// ! Admin SignUp => /api/v1/admin/signup [POST]
router.post(
  '/signup',
  validation.validateRequest,
  validation.checkValidation,
  authController.postSignUp
);

// ! Admin SignIN => /api/v1/admin/signin [POST]
router.post('/signin', authController.postSignIn);

// ! Admin Profile => /api.v1/admin/profile [POST]
router.post(
  '/profile',
  authentication.requireSignin,
  authController.postProfile
);

// ! Admin Check Token Validity => /api/v1/admin/tokenvalidity
router.post('/tokenvalidation', authController.postTokenValidityCheck);

// ! Admin Sign out => /api/v1/admin/signout
router.post('/signout', authController.postSignout);

module.exports = router;
