const nodemailer = require('nodemailer');
const {EMAIL_FROM, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_SERVICE } = require('../config/env');

module.exports = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
  
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log('Server is ready to take our messages');
            resolve(success);
        }
    });
  });

  const mailData = {
    from: {
        name: EMAIL_FROM,
        address:EMAIL_FROM,
    },
    replyTo: EMAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            resolve(info);
        }
    });
  });

};

