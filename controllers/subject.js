import subject from '../models/subject.js'
import department from '../models/department.js'
import user from '../models/user.js';

export const index = async (req, res) => {
    const subjects = await subject.find({}, { name: 1, code: 1 }).lean();
    res.render('subjects/index', { subjects });
};
export const create = async (req, res) => {
    const departments = await department.find().lean();
    const doctors = await user.find({ usertype: 'Doctor' }).lean();
    const subjects = await subject.find({}, {}).lean();

    res.render('subjects/create', { departments: departments, doctors: doctors, subjects: subjects });

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

export const deleteSubject = async (req, res) => {
    const subjectId = req.params.id
    await subject.findOneAndDelete({ "_id": subjectId });
    res.redirect('/subjects');
};

export const updateSubject = async (req, res) => {
    const body =  JSON.parse(Object.keys(req.body)[0])
    const { refrenceCode } = body
    delete body.refrenceCode
     await subject.findOneAndUpdate({code: refrenceCode }, body);

    res.redirect('/subjects');
};