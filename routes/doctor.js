import { Router } from "express";
import department from '../models/department.js'
import { index, student } from '../controllers/doctor.js';

const router = new Router();

router.get('/', index);

router.get('/subject', student);

export default router;