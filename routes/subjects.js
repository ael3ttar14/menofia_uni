import { Router } from 'express';
import department from '../models/department.js';
import subject from '../models/subject.js';
import File from '../models/file.js';
import { create , index , store , deleteSubject , updateSubject , uploadSingleFile ,
   uploadSingleFileAndUpdateSubject , downloadFile , getStudentsBySubject} from '../controllers/subject.js';

const createSubjectRoutes = (upload) => {
 
  const router = new Router();
  
  router.get('/', index);
  
  router.get('/create', create);
  
  router.post('/', store);
  
  router.post('/delete/:id', deleteSubject);
  
  router.post('/update', updateSubject);
  
  // router.post('/upload', upload.single('file'), uploadSingleFile);
  
  // router.post('/upload/:id', upload.single('file'), uploadSingleFileAndUpdateSubject);
  
  // router.get('/download/:id', downloadFile);

  // router.get('/subjects/:code/students', getStudentsBySubject);
  
  return router;
};

export default createSubjectRoutes;