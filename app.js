const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Router
const email = require("./routes/email");
const subscription = require("./routes/subscription");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security middlewares
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent cross site scripting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Max requests per time
});
app.use(limiter); // Rate limiting
app.use(hpp()); // HTTP parameter polution
app.use(cors()); // Enable cors

// Mounting routes
app.use("/", email);
app.use("/subscription", subscription);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
