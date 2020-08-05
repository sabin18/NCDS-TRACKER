import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import isMyBusiness from '../../helpers/checkBusiness'
import moment from 'moment';
import { Op } from 'sequelize';


const { ErrorResponse, response } = responseUtil;


class PaymentController {

static async addPayment(req,res) {
const {period,price}=req.body;
const  { businessID } = req.params;
const {id}=req.user.payload;
const payedDate=moment().format('YYYY-MM-DD HH:mm:ss');
const expiryDate=moment(payedDate).add(period,'month').format('YYYY-MM-DD HH:mm:ss');
const payingBusiness = await models.pharmacy.findOne({where:{id:businessID}})

if(!payingBusiness){
    return  ErrorResponse(res,404,strings.business.error.BUSINESS_NOT_EXIST);
  }
const newPayment = await models.payment.create({
    business:businessID,
    amount:price,
    payDate:payedDate,
    expiryDate:expiryDate,
    period:period,
    user:id

 })
 await  models.pharmacy.update({ payment: newPayment.id, isPaid:true },{where:{id:businessID}});
 return response (res,200,strings.payment.success.PAYMENT_CREATED,newPayment);
}
    
}

export default PaymentController