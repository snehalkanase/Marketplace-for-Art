const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const multer = require("multer");
const path = require("path");
const errorMiddleware = require("./middleware/error");
// const catchAsyceErrorMiddleware = require("./middleware/catchAsyncError");

//import Routes

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");

//env

// dotenv.config({ path: "api/config/config.env" });
require('dotenv').config();

// Database connection

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      connectionParams
    );
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Failed to Connect to MongoDB")
  }
});
database();

app.use(express.urlencoded({ extended: false }))
app.use("/images", express.static(path.join(__dirname, "public/images")));


//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleware);
// app.use(catchAsyceErrorMiddleware);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
   cb(null, file.originalname);
  }, 
});

const upload = multer({storage} );
app.post("/api/upload", upload.single("file"), (req, res) => {
  try{
    return res.status(200).json("File uploaded Successfully.");
  }catch(err){
    console.log(err);
  }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/order",orderRoute );
app.use("/api/payment", paymentRoute );

app.get("/", (req, res) => {
  res.send("/")
});
app.get("/login", (req, res) => {
  res.send("/login")
});
app.get("/register", (req, res) => {
  res.send("/register")
});
app.get('/logout', (req, res) => { re
  s.clearCookie('token'); 
  return res. redirect('/register'); });

app.listen(8080, () => {
  console.log("Backend server is running!");
});