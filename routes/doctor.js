import { Router } from "express";
import department from '../models/department.js'
import { index, student, uploadSingleFile, uploadSingleFileAndUpdateSubject} from '../controllers/doctor.js';


const createDoctorRoutes = (upload) => {
 
    const router = new Router();
    
    router.get('/', index);

    router.get('/subject', student);

    router.post('/upload', upload.single('file'), uploadSingleFile);

    router.post('/upload/:id', upload.single('file'), uploadSingleFileAndUpdateSubject);
    
    
    return router;
};

export default createDoctorRoutes;