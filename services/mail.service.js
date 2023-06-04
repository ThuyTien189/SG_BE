const nodemailer = require('nodemailer');
require('dotenv').config()

const mailService = {
    async sendEmail({ fromEmail, toEmail, subjectEmail, textEmail }) {
        console.log(process.env.SMTP_PORT);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        await transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            subject: subjectEmail,
            text: textEmail
        }, (err, infor) => {
            if(err) {
                console.log(err);
            } 
            console.log(nodemailer.getTestMessageUrl(infor));
        })
    }
}

Object.freeze(mailService)

module.exports = {
    mailService
}