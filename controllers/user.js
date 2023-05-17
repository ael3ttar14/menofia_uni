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

  await user.create({ username, email, password: encryptedpassword, usertype, number_id });

  res.redirect('/login');
};

export const loginform = (req, res) => {
  res.render('authentication/login');
};

export const login = async (req, res) => {
  const { email, password, usertype } = req.body;

  const loggeduser = await user.findOne({ email });
  
  if (!loggeduser) {
    return res.send("Sorry, we don't recognize that username or password. You can try again...");
  }

  const isCorrectPassword = bcrypt.compareSync(password, loggeduser.password);

  if (!isCorrectPassword) {
    return res.send("Sorry, we don't recognize that username or password. You can try again...");
  }
  
  if (loggeduser.usertype !== usertype) {
    return res.send("Sorry, the user type you entered is incorrect. You can try again...");
  }
  

  const data = {
    _id: loggeduser._id,
    email: loggeduser.email,
    usertype: loggeduser.usertype
  };


  

  const jwtToken = jwt.sign(data, process.env.JWT_SECRET);

  res.cookie('token', jwtToken);

  if (loggeduser.usertype === 'Admin') {
    res.redirect('/admin');
  } else if (loggeduser.usertype === 'Student') {
    res.redirect('/user');
  } else if (loggeduser.usertype === 'Doctor') {
    res.redirect('/doctor');
  } else {
    return res.send("Sorry, the user type is not recognized. You can try again...");
  }
};

export const admin = (req, res) => {
  res.render('admin');
};

export const User = (req, res) => {
  res.render('user');
};

export const doctor = (req, res) => {
  res.render('doctor');
};

