// routes/subject.js
import { Router } from 'express';
import department from '../models/department.js';
import subject from '../models/subject.js';
import File from '../models/file.js'; // Make sure this is correctly imported
import { create, index, store, deleteSubject, updateSubject } from '../controllers/subject.js';

const createSubjectRoutes = (upload) => {
  const router = new Router();

  router.get('/', index);

  router.get('/create', create);

  router.post('/', store);

  router.post('/delete/:id', deleteSubject);

  router.post('/update', updateSubject);

  router.post('/upload', upload.single('file'), async (req, res) => {
    const file = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      path: req.file.path,
      size: req.file.size,
    });

    await file.save(); 
    res.json({ message: 'Upload completed successfully' });
  });

  router.post('/upload/:id', upload.single('file'), async (req, res) => {
    const subjectId = req.params.id;

    const file_path = `/uploads/${req.file.filename}`;

    const file = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      path: req.file.path,
      size: req.file.size,
    });

    await file.save();

    await subject.findByIdAndUpdate(subjectId, { file: file._id });

    res.redirect('/subjects');
  });

  return router;
};

export default createSubjectRoutes;