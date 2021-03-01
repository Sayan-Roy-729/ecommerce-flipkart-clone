const User = require('../../models/user');
const jwt = require('jsonwebtoken');

// ! Admin Sign Up (Create new user)
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
        role: 'admin',
      });

      // save the user into database
      return _user.save();
    })
    .then((result) => {
      // Response for creating user successfullt
      res.status(201).json({
        message: 'Admin created successfully!',
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

// ! Admin sign in
exports.postSignIn = (req, res, next) => {
  // Find user with registered email
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If user now found, throw error
      if (!user) {
        const error = new Error('No user found');
        error.statusCode = 401;
        throw error;
      }
      // check password and also check role of user is admin or not
      const password = req.body.password;
      userData = user;
      if (
        user.authenticate(password, user.hash_password) &&
        user.role === 'admin'
      ) {
        return true;
      } else {
        // throw error if password or admin not matched
        const error = new Error('Password or role not matched!');
        error.statusCode = 401;
        throw error;
      }
    })
    .then((isEqual) => {
      // Create JSON Web Token
      const token = jwt.sign(
        {
          userId: userData._id,
          role: userData.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.cookie("token", token, { expiresIn: "1d" });
      // Send response with token
      res.status(200).json({
        userId: userData._id,
        token: token,
      });
    })
    .catch((err) => {
      // Handle any error
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ! Admin profile
exports.postProfile = (req, res, next) => {
  res.status(200).json({ user: 'Profile' });
};





// ! Token Validity Check
exports.postTokenValidityCheck = (req, res, next) => {
  // Extract Authorization Header
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  // If not set Authorization header, throw error
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  // Decode token [Bearer Token]
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  // If not verified with token, throw error
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  // Check user is exists or not
  const userId = req.body.userId;
  
  User.findById(userId)
  .then((user) => {
    if (!user) {
      const error = new Error('User is not exists');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'User is authenticated' });
  })
  .catch((error) => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  });
};


// ! Admin Sign out
exports.postSignout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
