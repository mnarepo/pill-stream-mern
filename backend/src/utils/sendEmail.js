const nodemailer = require('nodemailer');
const env = require('../config/env');

const sendEmail = async ({ to, subject, html, text }) => {
  if (!env.EMAIL_HOST || !env.EMAIL_USER || !env.EMAIL_PASS) {
    console.log('Email credentials are not configured. Email skipped:', { to, subject });
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: Number(env.EMAIL_PORT),
    secure: Number(env.EMAIL_PORT) === 465,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  return transporter.sendMail({
    from: `Pill Stream <${env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
};

module.exports = sendEmail;
