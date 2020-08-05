import models from '../../database/models'
import responseUtil from '../../Utils/responseUtil'
import strings from '../../Utils/strings'
import isMyBusiness from '../../helpers/checkBusiness'
import { Op } from 'sequelize';
import phoneNumbers from '../../helpers/notifiedPatient'
import dotenv from 'dotenv';

dotenv.config();


const { ErrorResponse, response } = responseUtil;
const { ACCOUNTS_ID, AUTH_TOKEN,PHONE_NUMBER } = process.env;
const accountSid = ACCOUNTS_ID;
const authToken = AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class notificationsController {
static  async GetAllNotifications(req,res){
    const { businessID } = req.params;
    const {id}=req.user.payload;
    await isMyBusiness(req,res);
    const notifications = await models.notifications.findAll({ where:{[Op.or]:[{businessId:businessID},{userId:id}]},
    attributes: {exclude: ['userId', 'businessId',]},
    include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },{ association: 'business', attributes: ['name'] }],
    })
   return response (res,200,'',notifications);
}

static async GetOneNotification(req,res){
    const  {id} = req.params;
    await isMyBusiness(req,res);
    const notication = await models.notifications.findOne({ where:{id},
    attributes: {exclude: ['userId', 'businessId',]},
    include: [{ association: 'user',attributes: { exclude: ['password','role','createdAt','updatedAt'] },include: [{ association: 'roles', attributes: ['name'] }] },{ association: 'business', attributes: ['name'] }],
    })

    if(!notication){
      return  ErrorResponse(res,404,strings.notifications.error.NOTIFICATION_NOT_FOUND);
    }
   return response (res,200,'',notication);
}

static async sendSMSNotification(req,res){

client.messages
  .create({
     body: 'This is the test message from NCDS APP',
     from:`${PHONE_NUMBER}`,
     to: await phoneNumbers()
   })
  .then(message => console.log(message.sid),
    console.log('====>message',`${PHONE_NUMBER}`)
  );
}
}

export default notificationsController;