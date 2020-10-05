const sendEmail = require("../utils/sendEmail");
const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");
const path = require("path");
const fs = require("fs");
const md = require("markdown-it")();

exports.landingPage = async (req, res, next) => {
  const readmePath = path.resolve("README.md");
  const file = fs.readFileSync(readmePath, "utf8");
  res.send(md.render(file));
};

exports.postEmail = async (req, res, next) => {
  let { email, message, phone } = req.body;

  // Data validation

  if (!email || !message) {
    const requiredField = !email ? "email" : "message";
    return next(
      new ErrorResponse(
        `Please provide the required field: ${requiredField}`,
        400
      )
    );
  }

  if (!validator.isEmail(email)) {
    return next(
      new ErrorResponse("Please provide a valid email address.", 400)
    );
  }

  if (phone) {
    message += `<br> Phone: ${phone}`;
  }

  // Sending email

  const msg = {
    to: process.env.TO_EMAIL,
    from: email,
    subject: "Email via POST",
    text: message,
    html: `<p>${message}</p>`,
  };

  const emailJob = await sendEmail(msg);

  if (!emailJob) {
    return next(
      new ErrorResponse(
        "Server error happened. Please use alternative ways to send the email, also could you please let me know about this issue? Thanks!",
        500
      )
    );
  }

  res.status(201).json({
    success: true,
    msg: "Email sent.",
  });
};
