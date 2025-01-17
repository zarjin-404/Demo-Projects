const express = require('express');
const router = express.Router();

const userModels = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/registrar', (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      res.send('Required All Fields');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new userModels({
      fullname,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
    );
    res.cookie('token', token);
    res.send(user);
  } catch (error) {
    console.log('Registrar Error' + error);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {});

module.exports = router;
