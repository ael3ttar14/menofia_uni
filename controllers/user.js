import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerform = (req, res) => {
  res.render('authentication/register');
};

export const register = async (req, res) => {
  const { username, email, password, usertype, number_id } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const encryptedpassword = bcrypt.hashSync(password, salt);

  try {
    await user.create({ username, email, password: encryptedpassword, usertype, number_id });
    res.redirect('/login');
  } catch (error) {
    if (error.code === 11000) {
      const errorMessage = 'The email or username you entered is already registered. Please try again with a different email or username.';
      res.status(400).send(errorMessage);
    } else {
      console.error(error);
      const errorMessage = 'An error occurred while creating your account. Please try again later.';
      res.status(500).send(errorMessage);
    }
  }
};

export const loginform = (req, res) => {
  res.render('authentication/login');
};

export const login = async (req, res) => {
  const { email, password, usertype } = req.body;

  try {
    const loggeduser = await user.findOne({ email: email.toLowerCase() });

    if (!loggeduser) {
      return res.send("Sorry, we don't recognize that username or password. You can try again...");
    }

    const isCorrectPassword = bcrypt.compareSync(password, loggeduser.password);

    if (!isCorrectPassword) {
      return res.send("Sorry, we don't recognize that username or password. You can try again...");
    }

    if (loggeduser.usertype.toLowerCase() !== usertype.toLowerCase()) {
      return res.send("Sorry, the user type you entered is incorrect. You can try again...");
    }

    const data = {
      _id: loggeduser._id,
      email: loggeduser.email,
      usertype: loggeduser.usertype,
      username: loggeduser.username
    };

    const jwtToken = jwt.sign(data, process.env.JWT_SECRET);

    res.cookie('token', jwtToken);

    if (loggeduser.usertype === 'Admin') {
      res.redirect('/admin');
    } else if (loggeduser.usertype === 'Student') {
      res.redirect('/student');
    } else if (loggeduser.usertype === 'Doctor') {
      res.redirect('/doctor');
    } else {
      return res.send("Sorry, the user type is not recognized. You can try again...");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = 'An error occurred while logging in. Please try again later.';
    res.status(500).send(errorMessage);
  }
};

export const admin = (req, res) => {
  res.render('admin');
};

export const User = (req, res) => {
  res.render('student');
};

export const doctor = (req, res) => {
  res.render('doctor');
};