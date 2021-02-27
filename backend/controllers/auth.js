const jwt = require('jsonwebtoken');

const User = require('../models/user');
const validator = require('../middlewares/validator');

// User Sign Up (Create new user)
exports.postSignUp = (req, res, next) => {
  // Check user exists or not
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if user exists, then throw error
      if (user) {
        const error = new Error('User already exists!');
        error.statusCode = 400;
        throw error;
      }
      // if user not exists, then fetch data from the request
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const password = req.body.password;

      const _user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userName: Math.random().toString(),
      });

      // save the user into database
      return _user.save();
    })
    .then((result) => {
      // Response for creating user successfullt
      res.status(201).json({
        message: 'User created successfully!',
        user: result,
      });
    })
    .catch((err) => {
      // Handle with errors
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ! User sign in
exports.postSignIn = (req, res, next) => {
  let userData;
  // Find user with registered email
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If user now found, throw error
      if (!user) {
        const error = new Error('No user found');
        error.statusCode = 401;
        throw error;
      }
      userData = user;
      // If user found, then check password is matched or not
      return user.authenticate(req.body.password, user.hash_password);
    })
    .then((isEqual) => {
      // if password not matched, then throw error
      if (!isEqual) {
        const error = new Error('Wrong Password!');
        error.statusCode = 401;
        throw error;
      }
      // Create JSON Web Token
      const token = jwt.sign(
        {
          userId: userData._id,
          role: userData.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      // Send response with token
      res.status(200).json({
        userId: userData._id,
        token: token,
      });
    })
    // Handle errors
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
