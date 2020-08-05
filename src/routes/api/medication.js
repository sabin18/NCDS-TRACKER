import express from 'express';
import MedicationsController from '../../controllers/Medication/Medication';
import checkToken from '../../middlewares/checkToken'
import checkRole from '../../middlewares/checkRole'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'
import multer from 'multer';

const upload = multer({ dest: 'tmp/csv/' });

const { validateMedication } = InPutValidation;

const {
      GetAllMedications,GetOneMedication,AddMedication,uploadMedication,deleteMedication,editMedication
   } = MedicationsController;  
   
const router = express.Router();
router.post('/', checkToken,checkId,checkRole.adminRole,validateMedication,AddMedication);
router.post('/upload-csv', checkToken,checkId,checkRole.adminRole,upload.single('file'), uploadMedication);
router.get('/', checkToken ,checkId,GetAllMedications);
router.get('/:id', checkToken ,checkId,checkRole.adminRole,GetOneMedication);
router.put('/:id', checkToken ,checkId,checkRole.adminRole,validateMedication,editMedication);
router.delete('/:id', checkToken ,checkId,checkRole.adminRole,deleteMedication);

export default router;
