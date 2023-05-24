import subject from '../models/subject.js'
import department from '../models/department.js'
import user from '../models/user.js';
import { doctor } from './user.js';

export const index = async (req, res) => {
    const subjects = await subject.find({}, { code: 1, name: 1, subject_depended: 1, doctor: 1 }).lean();

    res.render('student/student', { subjects});
};