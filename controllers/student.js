import user from '../models/user.js';
import subject from '../models/subject.js';
import Registration from '../models/registration.js';

async function index(req, res) {
  
  const userId = req.user._id;
  console.log(userId)


  const User = await user.findById(userId);


  const registration = await Registration.findOne({ student: user });
      console.log(userId)


  if (!registration) {
    return res.status(404).send('No registration found');
  }

  const registeredSubjects = registration.subjects;

  res.render('student/student', { subjects: registeredSubjects });
} 


export { index };


export const student = async (req, res) => {
    if (req.user.usertype === 'Student') {
       const subjects = await subject.find({}, { code: 1, name: 1, department: 1 }).lean();
       res.render('student/subject', { subjects });
    } else {
       const errorMessage = 'You must be a student to access this resource.';
       res.status(404).send(errorMessage);
       return;
    }
 };


export const registerSubjects = async (req, res) => {
  const subjects = await subject.find({}, {}).lean();

  res.render('student/register', {
      subjects: subjects,
  });
};





export const saveRegistration = async function saveRegistration(req, res) {
  try {
    const { name, subjects } = req.body;

    const User = await user.findOne({ username: req.body.name });

    if (!User) {
      throw new Error('User not found');
    }

    const subjectRefs = [];

    for (const subjectName of subjects) {
      const Subject = await subject.findOne({ name: subjectName });
      if (Subject) {
        subjectRefs.push(Subject.name);
      }
    }

    const registration = new Registration({
      student: User._id,
      subjects: subjectRefs,
    });

    await registration.save();

    res.redirect('/student');
  } catch (error) {
    res.status(500).send('An error occurred during registration.');
  }
}