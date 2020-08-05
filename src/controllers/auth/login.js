import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import generateToken from '../../helpers/generateToken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { ErrorResponse, response } = responseUtil;
class AuthController {
  static async verifyUser (req, res) {
    const { token }= req.params
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await models.Users.findOne({ where: {id:decodedToken.payload.id}});
    if (!user) {
    return  ErrorResponse (res,404,strings.users.error.USER_NOT_EXIST)

    }
    if (user.isVerified === true) {
      return ErrorResponse(res, 409, strings.users.error.VERIFIED);
    }

    const updatedUser = await models.Users.update( 
      { isVerified: true },
      { where: { id: decodedToken.payload.id } }
    );
    if(updatedUser){
    return response (res,200,strings.users.success.SUCCESS_VERIFIED);
    }
}
static async Login (req, res) {

    const {email, password} = req.body;
    const user = await models.Users.findOne({ where: {email}});
    if (!user) {
    return  ErrorResponse (res,400,strings.users.error.USER_NOT_FOUND)

    }
    if (user.isVerified === false) {
      return ErrorResponse(res, 400, strings.users.error.UNVERIFIED);
    }

    const checkpassword = bcrypt.compareSync(password, user.password);
    if(!checkpassword){
       return ErrorResponse(res,400,strings.users.error.INCORRECT_PASSWORD);
    }
  const userToken = generateToken(user)
  const LoginedUser={
      userId:user.id,
      FirstName:user.FirstName,
      email:user.email,
      role:user.role,
      token:userToken
  };
  return response (res,200,strings.users.success.LOGIN_SUCCESS, LoginedUser);
}

}

export default AuthController;