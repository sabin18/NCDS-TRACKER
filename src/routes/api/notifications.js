import express from 'express';
import NotificationController from '../../controllers/notifications/notifications';
import checkToken from '../../middlewares/checkToken'
import checkRole from '../../middlewares/checkRole'
import InPutValidation from '../../validation/inPutValidation'
import checkId from '../../helpers/checkId'

   const {
    GetAllNotifications,GetOneNotification,sendSMSNotification
   } = NotificationController;  
   
const router = express.Router();
router.get('/:businessID', checkToken,GetAllNotifications);
router.get('/:businessID/:id', checkToken ,GetOneNotification);
router.post('/SMS',sendSMSNotification);

export default router;
