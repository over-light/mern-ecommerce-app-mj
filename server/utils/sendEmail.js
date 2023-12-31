const nodemailer = require('nodemailer');
const {EMAIL_FROM, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_SERVICE } = require('../config/env');

// eslint-disable-next-line consistent-return
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
    await new Promise((resolve, reject) => { 

      transporter.sendMail(options, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });

     });
    // return transporter.sendMail(options, (error) => {
    //   if (error) console.log({error,message:'email not sent!'});
    //   else console.log('email sent successfully');
    // });
  } catch (error) {
    return error;
  }
};