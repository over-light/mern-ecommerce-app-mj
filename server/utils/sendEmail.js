const nodemailer = require('nodemailer');
const {EMAIL_FROM, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_SERVICE } = require('../config/env');

module.exports = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
    const options = {
      from: EMAIL_FROM,
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