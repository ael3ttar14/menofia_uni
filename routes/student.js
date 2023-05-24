import { Router } from "express";
import { index, student } from '../controllers/student.js';

const router = new Router();

router.get('/', index);

router.get('/subject', student);

export default router;