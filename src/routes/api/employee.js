import express from 'express';
import EmployeeController from '../../controllers/employees/employee';
import checkToken from '../../middlewares/checkToken'
import checkRole from '../../middlewares/checkRole'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'


const { validateAddUser } = InPutValidation;

const {
    AddEmployee,GetAllEmployees,GetOneEmployee,deleteEmployee,activateEmployee
   } = EmployeeController;
   
const router = express.Router();
router.post('/:businessID', checkToken,checkId,checkRole.managerRole,validateAddUser,AddEmployee);
router.get('/:businessID', checkToken ,checkId,checkRole.managerRole,GetAllEmployees);
router.get('/:businessID/:user', checkToken ,checkId,checkRole.managerRole,GetOneEmployee);
router.delete('/:businessID/:user', checkToken ,checkId,checkRole.managerRole,deleteEmployee);
router.patch('/:businessID/:user/activate', checkToken ,checkId,checkRole.managerRole,activateEmployee);

export default router;
