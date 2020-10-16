const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: [true, "Please add the host."],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  email: {
    type: String,
    required: [true, "Please add an email."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

RecipientSchema.pre("save", function (next) {
  let email = this.email;
  this.email = email.toLowerCase();
  next();
});

module.exports = mongoose.model("Recipient", RecipientSchema);
