import nodemailer from 'nodemailer';
import { EMAIL } from '../../constants';

let privateKey: any;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  privateKey = JSON.parse(process.env.EMAIL_SERVICE_PRIVATE_KEY);
}

export const transporter = nodemailer.createTransport({
  host: EMAIL.HOST,
  port: EMAIL.PORT,
  secure: true,
  auth: {
    type: 'OAUTH2',
    user: EMAIL.USER,
    serviceClient: process.env.EMAIL_SERVICE_CLIENT_ID,
    privateKey: privateKey?.emailServicePrivateKey || null,
  },
});
