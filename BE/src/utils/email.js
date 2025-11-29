const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // 2. Define email options
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'HM Jewelry <no-reply@hoangmyjewelry.com>',
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
