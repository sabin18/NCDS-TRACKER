import express from 'express';
import PatientController from '../../controllers/patients/patients'
import checkToken from '../../middlewares/checkToken'
import checkRole from '../../middlewares/checkRole'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'


const { validateAddPatient,validateUpdPatient } = InPutValidation;

const { addPatient,getAllPatient,getOnePatient,updatePatient,DeletePatient } = PatientController;
const router = express.Router();
router.post ('/:businessID',checkToken,checkId,validateAddPatient,checkRole.managerRole,addPatient);
router.get ('/:businessID',checkToken,checkId,checkRole.managerRole,getAllPatient);
router.get ('/:businessID/:id',checkToken,checkId,checkRole.managerRole,getOnePatient);
router.delete ('/:businessID/:id',checkToken,checkId,checkRole.managerRole,DeletePatient);
router.patch ('/:businessID/:id',checkToken,checkId,checkRole.managerRole,validateUpdPatient);


export default router;