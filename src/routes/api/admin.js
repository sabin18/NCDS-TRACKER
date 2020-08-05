import express from 'express';
import RolesController from '../../controllers/roles/roles';
import AdminController from '../../controllers/admin/admin';
import PharmacyController from '../../controllers/Pharmarcy/pharmarcy';
import PaymentController from '../../controllers/payments/payment'
import checkToken from '../../middlewares/checkToken'
import checkRole from '../../middlewares/checkRole'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'


const { validateAddUser,validateCreateBusiness,validateAddPayment } = InPutValidation;

const {
    GetAllusers,AddUser,
   } = AdminController;
   const {
    createBusiness,GetAllBusiness,GetOneBusiness
   } = PharmacyController;

   const {
    addPayment,
   } =PaymentController

const { GetRoles } = RolesController;
const router = express.Router();
router.get('/roles', checkToken ,GetRoles);
router.get('/users', checkToken ,checkRole.adminRole,GetAllusers);
router.post('/users', checkToken ,checkRole.adminRole,validateAddUser,AddUser);
router.post('/pharmacy', checkToken ,checkRole.adminRole,validateCreateBusiness,createBusiness);
router.post('/payment/:businessID', checkToken,checkId ,checkRole.adminRole,validateAddPayment,addPayment);
router.get('/pharmacy',checkToken ,checkRole.adminRole,GetAllBusiness);
router.get('/pharmacy/:businessID',checkToken,checkId,checkRole.adminRole,GetOneBusiness)

export default router;
