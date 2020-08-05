import Router from 'express';
import usersRoutes from './user';
import rolesRoutes from './admin';
import patientRoutes from './patients';
import recordsRoutes from './records';
import employeeRoutes from './employee'
import diseasesRoutes from './diseases'
import medicationRoutes from './medication'
import pharmacyRoutes from './pharmacy'
import noticationsRoutes from './notifications'

const router = new Router();

router.use('/auth', usersRoutes);
router.use('/admin', rolesRoutes);
router.use('/patients', patientRoutes);
router.use('/records', recordsRoutes);
router.use('/employee', employeeRoutes);
router.use('/medications', medicationRoutes);
router.use('/diseases', diseasesRoutes);
router.use('/pharmacy',pharmacyRoutes);
router.use('/notifications',noticationsRoutes);


export default router;
