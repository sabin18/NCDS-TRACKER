import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings';
import bcrypt from 'bcrypt';
import EmailHelper from '../../helpers/EmailHelper';
import EmailToken from '../../helpers/EmailToken';
import hashPassword from '../../utils/hashPassword';
import jwt from 'jsonwebtoken';

const { ErrorResponse, response } = responseUtil;
const { ResetToken, UseraccessRequired } =EmailToken
class ResetPasswordController {
  static async ResetPasswordlink (req, res) {
    const {email, host} = req.body;
    const user = await models.Users.findOne({ where: {email}});
    
    if (!user) {
    return  ErrorResponse (res,404,strings.users.error.USER_NOT_FOUND)

    }
    if (user.isVerified === false) {
      return ErrorResponse(res, 400, strings.users.error.UNVERIFIED);
    }
    if(user){
    const resetToken = ResetToken(user);
    const APP_URL = host
    ? `${host}/users/resetPassword/${resetToken}`
    : `${req.protocol}://${req.headers.host}/api/v1/auth/users/resetPassword/${resetToken}`;

    await EmailHelper.AuthEmail('E-shop Reset password Link',
    email,user.firstName,
   'Please you can reset your password now',
   'reset your password.',
   APP_URL,'reset password.'
   );
    
    return response (res,200,strings.users.success.SEND_EMAIL);
    }
}

static async ResetPassword (req, res, next) {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    
    await UseraccessRequired(req,res)
    
    const user = await models.Users.findOne({ where: {email:decodedToken.payload.email}});
    if (!user) {
    return  ErrorResponse (res,400,strings.users.error.USER_NOT_FOUND)

    }
    if (user.isVerified === false) {
      return ErrorResponse(res, 400, strings.users.error.UNVERIFIED);
    }

    if (newPassword !== confirmPassword){
      return ErrorResponse(res,400,strings.users.error.PASSWORD_NOT_MATCH);
    }
    
    const checkpassword = bcrypt.compareSync(newPassword, user.password);
    if(checkpassword){
       return ErrorResponse(res,409,strings.users.error.PASSWORD_ALREADY_EXISTS);
    }
    const updatedUser = await models.Users.update(
        { password: hashPassword(req.body.newPassword), },
        { where: { email: decodedToken.payload.email } }
      );
  return response (res,200,strings.users.success.PASSWORD_CHANGED);
}

}

export default ResetPasswordController;