const express = require('express');
const router = express.Router();
require('dotenv').config();

const isLoggedIn = require('../middlewares/isLoggedln.middlewares');

const {
  register,
  login,
  logout,
  profile,
} = require('../controllers/auth.controllers');

// Registration Route
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/register', register);

// Login Route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', login);

// Logout Route
router.get('/logout', logout);

// Profile Route (Protected)
router.get('/profile', isLoggedIn, profile);

module.exports = router;
