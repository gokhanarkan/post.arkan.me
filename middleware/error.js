const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error:
      error.message ||
      "Server error happened. Please use alternative ways to send the email, also could you please let me know about this issue? Thanks!",
  });
};

module.exports = errorHandler;
