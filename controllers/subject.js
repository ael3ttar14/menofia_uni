import multer from 'multer';
import subject from '../models/subject.js';
import department from '../models/department.js';
import user from '../models/user.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

export const index = async (req, res) => {
    const subjects = await subject.find({}, { name: 1, code: 1 }).lean();
    res.render('subjects/index', { subjects });
};

export const create = async (req, res) => {
    const departments = await department.find().lean();
    const doctors = await user.find({ usertype: 'Doctor' }).lean();
    const subjects = await subject.find({}, {}).lean();

    res.render('subjects/create', {
        departments: departments,
        doctors: doctors,
        subjects: subjects,
    });
};

export const store = async (req, res) => {

    const newSubject = new subject({
        name: req.body.name,
        code: req.body.code,
        doctor: req.body.doctor,
        department: req.body.department,
        subject_depended: req.body.subject_depended,
    });

    await newSubject.save();

    res.redirect('/subjects');
};


  
export const downloadFile = async (req, res) => {
    const subjectId = req.params.id;
    
    const subjectObj = await subject.findById(subjectId).populate('file').lean();
    if (subjectObj && subjectObj.file) {
      const file = subjectObj.file;
      res.download(file.path, file.originalname);
    } else {
      res.status(404).send('File not found');
    }
  };  

export const deleteSubject = async (req, res) => {
    const subjectId = req.params.id;
    await subject.findOneAndDelete({ _id: subjectId });
    res.redirect('/subjects');
};

export const updateSubject = async (req, res) => {
    const body = JSON.parse(Object.keys(req.body)[0]);
    const { refrenceCode } = body;
    delete body.refrenceCode;
    await subject.findOneAndUpdate({ code: refrenceCode }, body);
    res.redirect('/subjects');
};
export const getStudentsBySubject = async (req, res) => {
  try {
    const subjectCode = req.params.code;
    const subject = await subject.findOne({ code: subjectCode });
    const students = await students.find({ subjects: subject._id });

    res.render('students', { subject, students });
  } catch (err) {
    console.error('Error fetching students by subject:', err);
    res.status(500).send('An error occurred while fetching students by subject');
  }
};