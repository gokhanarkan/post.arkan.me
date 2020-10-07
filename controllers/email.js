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

exports.examplePage = async (req, res, next) => {
  const filePath = path.resolve("pages", "contact.html");
  const page = fs.readFileSync(filePath, "utf-8");
  res
    .header(
      "Content-Security-Policy",
      "script-src 'unsafe-eval' 'unsafe-inline' 'self' https://cdn.jsdelivr.net/npm/vue"
    )
    .send(page);
};

exports.postEmail = async (req, res, next) => {
  let { name, email, message, phone } = req.body;

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

  const from = name ? { email: email, name: name } : email;

  // Sending email

  const msg = {
    to: process.env.TO_EMAIL,
    from: from,
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
