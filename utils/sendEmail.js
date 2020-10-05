const sgMail = require("@sendgrid/mail");

const sendEmail = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  try {
    const email = await sgMail.send(msg);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendEmail;
