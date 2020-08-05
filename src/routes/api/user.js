import express from 'express';
import AuthController from '../../controllers/auth/login';
import resetPasswordController from '../../controllers/auth/resetPassword';
import InPutValidation from '../../validation/inPutValidation'


const { validateLogin, validateEmail,validateResetpassword } = InPutValidation;

const { Login, verifyUser } = AuthController;
const { ResetPasswordlink, ResetPassword } = resetPasswordController

const router = express.Router();

router.post ('/login',validateLogin, Login);
router.get('/users/verify/:token',verifyUser);
router.post('/users/forgotPassword', validateEmail,ResetPasswordlink);
router.patch('/users/resetPassword/:token',validateResetpassword,ResetPassword)


export default router;
