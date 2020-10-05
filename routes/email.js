const express = require("express");

const { postEmail, landingPage, examplePage } = require("../controllers/email");

const router = express.Router();

router.get("/", landingPage).post("/", postEmail);
router.get("/example", examplePage);

module.exports = router;
