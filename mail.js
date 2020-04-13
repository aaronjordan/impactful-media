const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const domain = 'impactfulmedia.co';
require('dotenv').config();

const auth = {
  auth: {
    api_key: process.env.API_MAIL_KEY,
    domain: 'sandbox31c511107dcf4796abf8c84583c21bce.mailgun.org'
  }
};


const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail = (name, email, body, cb) => {
  const mailOptions = {
    from: `contactform@${domain}`,
    to: `aaron@${domain}`,
    subject: `Contact Form Submission from ${domain}`,
    text: `A new form submission was recieved from ${name} @ ${email}:
    ${body}`
  };
  
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail();
