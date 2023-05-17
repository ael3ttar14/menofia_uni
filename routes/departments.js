import { Router } from "express";
import department from '../models/department.js'
import subject from '../models/subject.js'
import { index ,create, store } from '../controllers/department.js';

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.post('/', store);

export default router;