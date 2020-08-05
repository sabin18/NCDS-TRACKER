import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import hashPassword from '../../utils/hashPassword';
import isMyBusiness from '../../helpers/checkBusiness'
import { Op } from 'sequelize';
import generateToken from '../../helpers/generateToken';
import EmailHelper from '../../helpers/EmailHelper';


const { ErrorResponse, response } = responseUtil;
class EmployeeController {
static  async GetAllEmployees(req,res){
    const  { businessID } = req.params;
    await isMyBusiness(req,res);
    const users = await models.employees.findAll({ where:{pharmacyId:businessID},
    attributes: {exclude: ['userId', 'pharmacyId',]},
    include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },{ association: 'business', attributes: ['name'] }],
    })
   return response (res,200,'',users)
}

static  async GetOneEmployee(req,res){
    const  { businessID,user} = req.params;
    await isMyBusiness(req,res);
    const users = await models.employees.findOne({ where:{[Op.and]:[{pharmacyId:businessID},{id:user}]},
    attributes: {exclude: ['userId', 'pharmacyId',]},
    include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },{ association: 'business', attributes: ['name'] }],
    })

   if(!users){
      return  ErrorResponse(res,404,strings.users.error.USER_NOT_EXIST);
   } 
   return response (res,200,'',users)
}

static  async deleteEmployee(req,res){
   const  { businessID,user} = req.params;
   await isMyBusiness(req,res);
   const users = await models.employees.findOne({ where:{[Op.and]:[{pharmacyId:businessID},{id:user}]},
   })

  if(!users){
     return  ErrorResponse(res,404,strings.users.error.USER_NOT_EXIST);
  } 
  const deleteUsers = await models.employees.destroy({ where:{[Op.and]:[{pharmacyId:businessID},{id:user}]},});
  if(deleteUsers){
   return response (res,200,strings.users.success.DELETED)
  }
  
}

static  async activateEmployee(req,res){
   const  { businessID,user} = req.params;
   await isMyBusiness(req,res);
   const users = await models.employees.findOne({ where:{[Op.and]:[{pharmacyId:businessID},{id:user}]},
   })

  if(!users){
     return  ErrorResponse(res,404,strings.users.error.USER_NOT_EXIST);
  } 
  if(users.isActive===true){
  const ActivateUser = await models.employees.update({isActive:false}, {where:{[Op.and]:[{pharmacyId:businessID},{id:user}]},});
   return response (res,200,strings.users.success.DISACTIVETED)
  
}else{
   const disActivateUser = await models.employees.update({isActive:true}, {where:{[Op.and]:[{pharmacyId:businessID},{id:user}]},});
    return response (res,200,strings.users.success.ACTIVETED)
 
}
  
}

static async AddEmployee(req,res) {
const  { businessID } = req.params;
  const  {firstName,lastName,email,password,role,phoneNumber,host} = req.body;
  const user = await models.Users.findOne({ where:{email}});
  const roleName = await models.roles.findOne({ where:{name:role}});

  await isMyBusiness(req,res);

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
    await models.employees.create({
        userId:newUser.id,
        pharmacyId: businessID,
        isActive:true
     });
     const verifyToken = generateToken(newUser);
     const APP_URL = host
    ? `${host}/verify/${verifyToken}`
    : `${req.protocol}://${req.headers.host}/api/v1/auth/users/verify/${verifyToken}`;
  
     await EmailHelper.AuthEmail('Account Verification',
     email,firstName,
     'Please verify your mail',
     'verify your new account',
     APP_URL,'Verify Account'
     );  
   return response (res,200,strings.users.success.USER_ADDED)
}
}

export default EmployeeController;