const { body, validationResult } = require('express-validator');

// Validation check
exports.validateRequest = [
  body('firstName').notEmpty().withMessage('firstName is required'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('email').notEmpty().isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 charecter long'),
];

// Validation throw error
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(403).json({ errors: errors.array()});
  }
  next();
};
