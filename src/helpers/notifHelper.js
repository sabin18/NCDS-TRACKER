import moment from 'moment';
import models from '../database/models';

class NotifHelper {

static async notifSaver(notif) {
   const notification = await notif.save();
   return notification;
}  
static async AddNotication(business,user,activity) {
const timestamp = moment().format('HH:mm:ss');  
 const newNotification = await models.notifications.create ({
        userId:user,
        businessId:business,
        activity:activity,
        timestamp,
     }) 
    return newNotification;
  }
}
export default NotifHelper