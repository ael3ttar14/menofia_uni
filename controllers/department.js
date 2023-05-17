import subject from '../models/subject.js'
import department from '../models/department.js'
import user from '../models/user.js';
import { doctor } from './user.js';

export const index = async (req, res) => {
    const departments = await department.find({}, { name: 1, code: 1 }).lean();
    console.log(departments);
    res.render('departments/index', { departments });

};

export const create = async (req, res) => {
    const doctors = await user.find({ usertype: 'Doctor' }).lean();
    res.render('departments/create', { doctors: doctors });

};

export const store = async (req, res) => {

    const newdepartment = new department({
        name: req.body.name,
        code: req.body.code,
        head_department: req.body.head_department,
    });

    await newdepartment.save();

    res.redirect('/departments');
};

