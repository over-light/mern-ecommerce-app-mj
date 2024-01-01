const nodemailer = require('nodemailer');
const {EMAIL_SENDER, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_SERVICE } = require('../config/env');

module.exports = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
      secure:false,
    });
    const options = {
      from: EMAIL_SENDER,
      to,
      subject,
      text,
      html,
    };

    return transporter.sendMail(options, (error) => {
      if (error) console.log({error,message:'email not sent!'});
      else console.log('email sent successfully');
    });
  } catch (error) {
    return error;
  }
};