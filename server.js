import express from 'express';
import { create } from 'express-handlebars';

import dotenv from 'dotenv'
dotenv.config();

import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

mongoose.connect(process.env.mongoConnectionUrl);

import adminRouter from './routes/admin.js';
import doctorRouter from './routes/doctor.js';
import studentRouter from './routes/student.js';
import subjectsRouter from './routes/subjects.js';
import departmentsRouter from './routes/departments.js';
import authenticationRouter from './routes/authentication.js';
import { authentication } from './middleware/authentication.js';
import { Admin } from './middleware/isAdmin.js';
import { Doctor } from './middleware/isDoctor.js';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const hbs = create({ /* config */ });
// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './template');

app.use('/register', authentication,Admin, authenticationRouter);
app.use('/', authenticationRouter);
app.use('/admin', authentication,Admin, adminRouter);
app.use('/doctor', authentication,Doctor, doctorRouter);
app.use('/student', authentication, studentRouter);

app.use('/subjects', authentication,  subjectsRouter);
app.use('/departments', authentication, departmentsRouter);

app.listen(process.env.port,() =>{
	console.log('started application on http://localhost:'+process.env.port)
});



