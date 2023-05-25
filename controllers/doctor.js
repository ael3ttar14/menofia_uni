import department from '../models/department.js';
import subject from '../models/subject.js';
import user from '../models/user.js';
import { doctor } from './user.js';
import File from '../models/file.js';

export const index = async (req, res) => {
   console.log(req.user);
   const findsubject = await subject.find({ doctor: req.user.username }).lean();
   if (req.user.usertype === 'Doctor' || findsubject.some(subject => subject.doctor === req.user.username)) {
      const subjects = await subject.find({ doctor: req.user.username }, { code: 1, name: 1, department: 1, subject_depended: 1 }).lean();
      const users = await user.find({ usertype: 'student' }, { number_id: 1, username: 1, email: 1}).lean();
      res.render('doctor/doctor', { subjects , users });
   } else {
      const errorMessage = 'You must be a doctor to access this resource.';
      res.status(404).send(errorMessage);
      return;
   }
};

export const student = async (req, res) => {
   console.log(req.user);
   const findsubject = await subject.find({ doctor: req.user.username }).lean();
   if (req.user.usertype === 'Doctor' || findsubject.some(subject => subject.doctor === req.user.username)) {
      const subjects = await subject.find({ doctor: req.user.username }, { code: 1, name: 1, department: 1 }).lean();
      const students = await user.find({ usertype: 'Student' }).lean();
      res.render('doctor/subject', { students, subjects });
   } else {
      const errorMessage = 'You must be a doctor to access this resource.';
      res.status(404).send(errorMessage);
      return;
   }
};

export const uploadSingleFile = async (req, res) => {
   const file = new File({
     filename: req.file.filename,
     originalname: req.file.originalname,
     mimetype: req.file.mimetype,
     path: req.file.path,
     size: req.file.size,
   });
 
   await file.save();
   // await res.json({ message: 'Upload completed successfully' });
   res.redirect('/doctor/subject');
 };
 
 export const uploadSingleFileAndUpdateSubject = async (req, res) => {
   const subjectId = req.params.id;
 
   const file = new File({
     filename: req.file.filename,
     originalname: req.file.originalname,
     mimetype: req.file.mimetype,
     path: req.file.path,
     size: req.file.size,
   });
 
   await file.save();
 
   await subject.findByIdAndUpdate(subjectId, { file: file._id });
 
   res.redirect('/subjects');
 };