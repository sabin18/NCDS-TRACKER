import models from '../database/models'
import responseUtil from '../Utils/responseUtil'
import strings from '../Utils/strings'
import { Op } from 'sequelize';
import isPayed from './checkPayement'
const { ErrorResponse } = responseUtil;

const isMyBusiness = async (req,res)  =>{
const { id } = req.user.payload;
const { businessID } = req.params;

await isPayed(req,res)
const pharmacy = await models.pharmacy.findOne({where:{id:businessID}});
const employee = await models.employees.findOne({ where:{ [Op.and]: [{userId:id}, {pharmacyId:businessID}]}});

 if(!pharmacy){
   return  ErrorResponse(res,404,strings.business.error.BUSINESS_NOT_EXIST);
 }

 if (pharmacy.owner != id && !employee){
  return  ErrorResponse(res,403,strings.business.error.NO_ACCESS);
 }

 if (pharmacy.isPaid===false){
  return  ErrorResponse(res,403,strings.payment.error.NO_SUBSCRIPTION);
 }
 
}

export default isMyBusiness;

