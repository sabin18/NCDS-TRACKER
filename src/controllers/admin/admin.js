import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import hashPassword from '../../utils/hashPassword';
import { Op } from 'sequelize';
import generateToken from '../../helpers/generateToken';
import EmailHelper from '../../helpers/EmailHelper';


const { ErrorResponse, response } = responseUtil;
class AdminController {
static  async GetAllusers(req,res){
   const users = await models.Users.findAll({ 
    attributes: { exclude: ['password', 'role'] },
    include: [{ association: 'roles', attributes: ['name'] }],
    })
   return response (res,200,'',users)
}

static async AddUser(req,res) {
  const  {firstName,lastName,email,password,role,phoneNumber,host} = req.body;

  const user = await models.Users.findOne({ where:{ [Op.or]: [{email}]}});
  const roleName = await models.roles.findOne({ where:{name:role}});

    if (user) {
    return  ErrorResponse (res,409,strings.users.error.USER_ALREADY_FOUND)

    }
   const newUser = await models.Users.create ({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword(password),
      role:roleName.id,
      isActive:true,
      isVerified:false,
      phoneNumber:phoneNumber,
      
   })
   const verifyToken = generateToken(newUser);
   const APP_URL = host
  ? `${host}/verify/${verifyToken}`
  : `${req.protocol}://${req.headers.host}/api/v1/auth/users/verify${verifyToken}`;

   await EmailHelper.AuthEmail('Account Verification',
   email,firstName,
   'Please verify your mail',
   'verify your new account',
   APP_URL,'Verify Account'
   );
      
   return response (res,200,strings.users.success.USER_ADDED);
}
}

export default AdminController;