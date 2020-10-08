const express = require("express");

const { saveSubscriber } = require("../controllers/subscription");
const Subscription = require("../models/Subscription");
const router = express.Router();

router.post("/", saveSubscriber);

module.exports = router;
