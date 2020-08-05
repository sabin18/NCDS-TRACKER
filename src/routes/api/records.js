import express from 'express';
import RecordController from '../../controllers/records/records'
import checkToken from '../../middlewares/checkToken'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'


const {  validateAddrecord } = InPutValidation;

const { addMedicalRecord,addCart,viewSales,viewSingleMedicalRecords,viewMedicalRecords } = RecordController;
const router = express.Router();
router.post ('/:businessID',checkToken,checkId,validateAddrecord,addMedicalRecord);
router.get ('/:businessID/:id',checkToken,checkId,viewSingleMedicalRecords);
router.get ('/:businessID',checkToken,checkId,viewMedicalRecords);
export default router;