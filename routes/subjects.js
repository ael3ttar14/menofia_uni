import { Router } from "express";
import department from '../models/department.js'
import subject from '../models/subject.js'
import { create, index, store, deleteSubject } from '../controllers/subject.js';

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.post('/', store);

router.post('/delete/:id', deleteSubject)

export default router;