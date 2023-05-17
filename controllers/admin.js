import subject from '../models/subject.js'
import department from '../models/department.js'
import user from '../models/user.js';
import { doctor } from './user.js';


export const index = async (req, res) => {
    const users = await user.find({}, { number_id: 1, username: 1, email: 1, usertype: 1 }).lean();
    const subjects = await subject.find({}, { code: 1, name: 1, subject_depended: 1, doctor: 1 }).lean();
    const departments = await department.find({}, { code: 1, name: 1, head_department: 1 }).lean();
    res.render('admin/admin', { users, subjects, departments });
};

