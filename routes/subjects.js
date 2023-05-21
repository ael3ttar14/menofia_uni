import { Router } from "express";
import department from '../models/department.js'
import subject from '../models/subject.js'
import { create, index, store, deleteSubject, updateSubject } from '../controllers/subject.js';

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.post('/', store);

router.post('/delete/:id', deleteSubject)

router.post('/update', updateSubject)

export default router;