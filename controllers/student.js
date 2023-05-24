import user from '../models/user.js';
import subject from '../models/subject.js';
import Registration from '../models/registration.js';

export const index = async (req, res) => {
  try {
    const subjects = await subject.find({}, { code: 1, name: 1, subject_depended: 1, doctor: 1 }).lean();
    res.render('student/student', { subjects });
  } catch (error) {
    console.error('Error retrieving subjects:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the subjects' });
  }
};



export const registerSubjects = async (req, res) => {
  const subjects = await subject.find({}, {}).lean();

  res.render('student/register', {
      subjects: subjects,
  });
};





async function saveRegistration(req, res) {
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

export { saveRegistration };
