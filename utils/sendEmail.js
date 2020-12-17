const sgMail = require("@sendgrid/mail");
const AWS = require("aws-sdk");

const {
  AWS_ACCESS_KEY_ID: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKey,
  AWS_REGION: region,
  SOURCE_EMAIL: messageSource,
} = process.env;

const config = {
  apiVersion: "2010-12-01",
  accessKeyId,
  secretAccessKey,
  region,
};

const sendEmail = async (msg) => {
  const params = {
    Source: messageSource,
    Destination: {
      ToAddresses: [msg.to],
    },
    ReplyToAddresses: [msg.from.email ? msg.from.email : msg.from],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: msg.html,
        },
        Text: {
          Charset: "UTF-8",
          Data: msg.text,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: msg.subject,
      },
    },
  };
  try {
    await new AWS.SES(config).sendEmail(params).promise();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sendEmailSG = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  try {
    await sgMail.send(msg);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendEmail;
