const express = require("express");

const { postEmail } = require("../controllers/email");

const router = express.Router();

router.post("/", postEmail);

module.exports = router;
