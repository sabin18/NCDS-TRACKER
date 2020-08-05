import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { EMAIL_PASSWORD, EMAIL_ADDRESS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
});


const AuthEmail = (subject,email,firstName,actionText,TextMessage,Url,button) => {
  try { 
    const message = {
        to:email,
        from:'NCDS',
        subject,
        html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
          <h1 style="color: #848484;">E-Shop</h1>
          <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Welcome ${firstName},<br> We are happy to be with you. ${actionText}.<br>Click the button below to ${TextMessage}.</p>
          <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${Url}">${button}</a>
          </a></p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>NCDS Team</p>
          </div>`
    };
    transporter.sendMail(message);
  } catch (error) {
    return error;
  }
};



export default {  AuthEmail };
