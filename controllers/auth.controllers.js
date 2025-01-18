const userModels = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// register controller
const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).send('Required All Fields');
    }

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new userModels({
      fullname,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
    );

    res.cookie('token', token);
    res.redirect('/user/profile');
  } catch (error) {
    console.log('Registrar Error: ' + error);
    res.status(500).send('Internal Server Error');
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Required All Fields');
    }

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(400).send('User does not exist');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
    );

    res.cookie('token', token);
    res.redirect('/user/profile');
  } catch (error) {
    console.log('Login Error: ' + error);
    res.status(500).send('Internal Server Error');
  }
};

// logout controller
const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.redirect('/user/login');
  } catch (error) {
    console.log('Logout Error: ' + error);
    res.status(500).send('Internal Server Error');
  }
};

// profile controller
const profile = async (req, res) => {
  try {
    const user = await userModels
      .findOne({ email: req.user.email })
      .select('-password');
    console.log(user);
    res.render('profile', { user });
  } catch (error) {
    console.log('Error fetching user profile: ' + error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
};
