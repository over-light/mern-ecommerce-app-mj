const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();
module.exports = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
        });
        const options = {
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
            text: text,
            html: html
        }

        transporter.sendMail(options, (error, info) => {
            if (error) console.log("email not sent!");
            else console.log("email sent successfully");
        })

    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};