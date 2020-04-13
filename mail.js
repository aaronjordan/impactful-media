const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
require('dotenv').config();

const recpnt = process.env.REC_EMAIL;
const domain = process.env.WWW_DOMAIN;
const auth = {
  auth: {
    api_key: process.env.API_MAIL_KEY,
    domain: process.env.MG_DOMAIN
  }
};


const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail = (name, email, body, cb) => {
  const time = Date().toString();
  const mailOptions = {
    from: `contactform@${domain}`,
    to: `${recpnt}`,
    subject: `New Contact Form Submission from ${domain}`,
    text: `A new form submission was recieved from ${name} (reply-to: ${email}):
    ${body}
    
    Message passed at ${time}.`
  };
  
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
