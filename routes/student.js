import { Router } from "express";
import { index, student, registerSubjects, saveRegistration } from '../controllers/student.js';

const router = new Router();

router.get('/', index);
router.get('/register', registerSubjects);
router.post('/',saveRegistration)


router.get('/subject', student);

export default router;