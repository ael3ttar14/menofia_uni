import { Router } from "express";
import { index, student, registerSubjects, saveRegistration, download} from '../controllers/student.js';

const router = new Router();

router.get('/', index);
router.get('/register', registerSubjects);
router.post('/',saveRegistration)
router.get('/subject', student);
router.get('/download/:id', download);

export default router;