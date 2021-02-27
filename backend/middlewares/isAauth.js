const jwt = require('jsonwebtoken');

// ! Check authorization token has or not
exports.requireSignin = (req, res, next) => {
  // Extract Authorization Header
  const authHeader = req.headers.authorization;
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
  // pass the userId to the next middleware
  req.role = decodedToken.role;
  req.userId = decodedToken.userId;
  next();
};

// ! Check not admin user
exports.userMiddleware = (req, res, next) => {
  if (req.role !== 'user') {
    return res.status(403).json({ message: 'User access denied!' });
  }

  next();
};


// ! Check admin user or not
exports.adminMiddleware = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access denied!' });
  }
  next();
};
