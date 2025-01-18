const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    req.user = user;
    next();
  });
};

module.exports = isLoggedIn;
