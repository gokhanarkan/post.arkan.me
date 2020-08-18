const sgMail = require("@sendgrid/mail");

const sendEmail = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  try {
    const email = await sgMail.send(msg);
    console.log(email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendEmail;
