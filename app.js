const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")

//Security middleware import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer')

// Routers
const userRouter = require("./src/routers/user")

global.__basedir = __dirname;


//security middleware implement
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.static(path.join(__dirname, "uploads")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//Request rate-limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Database connections
const options = { user: "", pass: "", autoIndex: true };
const MONGO_URL = process.env.NODE_ENV === 'DEV'
  ? process.env.MONGO_URL_LOCAL : process.env.NODE_ENV === 'PROD'
    ? process.env.MONGO_URL_CLUSTER : ''

console.log('Mongo URL: ', MONGO_URL)
mongoose.connect(MONGO_URL, options, (err) => {
  if (!err) {
    console.log("DB connection success");

    console.log("Server Running at port ", process.env.PORT);
    console.log("--------------------------------------------------\n\n\n");
  } else {
    console.log("Db connection fails!");
  }
});

//Handling CORS
app.use((req, res, next) => {
  const devUrls = [
    'http://localhost:5000',
    'https://bholabarassociation.com',
    'http://192.168.0.110:5000',
    'http://192.168.0.105:5000',
    'http://localhost:3000',
  ]
  const prodUrls = [
    'http://localhost:5000',
    'http://bholabarassociation.com',
    'http://bholabarassociation.com:3000',
    'http://66.29.130.89',
    'http://66.29.130.89:3000',
    'https://bholabarassociation.com',
    'https://bholabarassociation.com:3000',
    'https://66.29.130.89',
    'https://66.29.130.89:3000'
  ]
  const allowedOrigins =
    process.env.NODE_ENV === 'DEV' ? devUrls
      : process.env.NODE_ENV === 'PROD' ? prodUrls
        : []

  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
});




app.use("/api/v1/user", userRouter)

app.use("*", (req, res) => {
  res.status(404).json({ status: "Fail", data: "URL Not Found !" });
});

module.exports = app;
