import { Router } from "express";
import { index,registerSubjects,saveRegistration } from '../controllers/student.js';

const router = new Router();

router.get('/', index);
router.get('/register', registerSubjects);
router.post('/',saveRegistration)


export default router;