import responseUtil from '../Utils/responseUtil'
import strings from '../Utils/strings'

const { ErrorResponse } = responseUtil;

const adminRole = (req,res,next) =>{
 const { role } = req.user.payload;
 
 if (role!=1){   
    return  ErrorResponse(res,403,strings.users.error.AUTHORIZED);
 }
return next();
}

const managerRole = (req,res,next) =>{
   const { role } = req.user.payload;
     
   if (role!=2 && role!=4){
  
      return  ErrorResponse(res,403,strings.users.error.AUTHORIZED);
   }
  return next();
  }

export default {adminRole,managerRole};