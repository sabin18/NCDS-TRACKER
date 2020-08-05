import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import notifHelper from './notifHelper';
import findOwner from './findOwner';

dotenv.config();

const { EMAIL_PASSWORD, EMAIL_ADDRESS } = process.env;
const { notifSaver, AddNotication } = notifHelper ;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
});

const notifSender = async (subject,id, businessId, userId, APP_URL, activity, table,App,Email) => {
  try {
    const user = await findOwner(businessId);
    const activityMessage = `A ${table} has been ${activity}. Click here to view: ${APP_URL}/api/v1/${table}/${businessId}/${id}.`;

    if (App==='App') {
      let notification;
      switch (table) {
      case'product':
       notification = await AddNotication(businessId, userId, activityMessage);
        break;
      }
    }

    if (Email==='Email') {
      const { email,firstName } = user;
      const msg = {
        to:email,
        from: EMAIL_ADDRESS,
        subject,
        html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
          <h1 style="color: #848484;">E-Shop</h1>
          <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
            Hello dear ${firstName}, <br> This is to notify you that a ${table} has been ${activity}. <br> Click the button below to view the ${table}.
          </p>
          <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${APP_URL}/api/v1/${table}s/${id}">View ${table}</a></a></p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our system!</p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Barefoot Nomad Caret Team</p>
          </div>`
      };
      transporter.sendMail(msg);
    }
  } catch (error) { return error; }

};

export default notifSender;
