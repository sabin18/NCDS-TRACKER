import express from 'express';
import DiseasesController from '../../controllers/diseases/deseases';
import checkToken from '../../middlewares/checkToken'
import checkRole from '../../middlewares/checkRole'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'
import multer from 'multer';

const upload = multer({ dest: 'tmp/csv/' });

const { validateMedication } = InPutValidation;

   const {
      AddDiseases,GetAllDiseases,GetOneDisease,uploadDiseases,deleteOneDisease,editDisease
   } = DiseasesController;  
   
const router = express.Router();
router.post('/', checkToken,checkRole.adminRole,validateMedication,AddDiseases);
router.post('/upload-csv', checkToken,checkId,checkRole.adminRole,upload.single('file'), uploadDiseases);
router.get('/', checkToken,GetAllDiseases);
router.get('/:id', checkToken,checkRole.adminRole,GetOneDisease);
router.delete('/:id', checkToken,checkRole.adminRole,deleteOneDisease);
router.put('/:id', checkToken,checkRole.adminRole,validateMedication,editDisease);

export default router;
