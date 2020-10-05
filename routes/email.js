const express = require("express");

const { postEmail, landingPage } = require("../controllers/email");

const router = express.Router();

router.get("/", landingPage).post("/", postEmail);

module.exports = router;
