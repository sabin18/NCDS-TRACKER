import models from '../database/models'
import responseUtil from '../Utils/responseUtil'
import strings from '../Utils/strings'
import moment from 'moment';

const { ErrorResponse } = responseUtil;

const isPayed = async (req,res)  =>{
const { businessID } = req.params;
const pharmacy = await models.pharmacy.findOne({where:{id:businessID},
    attributes: { exclude: ['payment'] },
    include: [{ association: 'payments', attributes: ['expiryDate'] }],
     });
if(!pharmacy){
  return  ErrorResponse(res,404,strings.business.error.BUSINESS_NOT_EXIST);
 
}

 if(!pharmacy.payments || pharmacy.payments==null){
    return  ErrorResponse(res,403,strings.payment.error.NO_SUBSCRIPTION);
   }     
const expiryDate= pharmacy.payments.expiryDate;
const nowDate=moment().format('YYYY-MM-DD HH:mm:ss')


 if(expiryDate===nowDate){
    await  models.pharmacy.update({ isPaid:false},{where:{id:businessID}});
    return  ErrorResponse(res,403,strings.payment.error.NO_SUBSCRIPTION);
 }
 
}

export default isPayed


