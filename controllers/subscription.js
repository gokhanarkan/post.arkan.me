const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");
const Subscription = require("../models/Subscription");

// @desc        Add subscriber to the database
// @route       POST /subscriptions/
// @access      Public

exports.saveSubscriber = async (req, res, next) => {
  if (!req.headers.origin) {
    return next(new ErrorResponse("Your request is not accepted.", 400));
  }

  const url = `${req.headers.origin}`;
  const { email } = req.body;

  if (!email) {
    return next(new ErrorResponse("Email cannot be empty.", 400));
  }

  try {
    const subscriber = await Subscription.create({ url, email });
    res.status(200).json({
      success: true,
      data: subscriber,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error, 500));
  }
};
