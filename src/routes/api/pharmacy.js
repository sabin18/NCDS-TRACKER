import express from 'express';
import PharmacyController from '../../controllers/Pharmarcy/pharmarcy';
import checkToken from '../../middlewares/checkToken'
import checkId from '../../helpers/checkId'

   const {
    GetAllMyBusiness,GetOneMyBusiness
   } = PharmacyController;

const router = express.Router();
router.get('/',checkToken,GetAllMyBusiness);
router.get('/:businessID',checkToken,checkId,GetOneMyBusiness)

export default router;
