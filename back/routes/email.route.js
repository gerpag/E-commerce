const express = require("express");
const emailRouter = express.Router();
const nodemailer = require("nodemailer");
const EmailController=require("../controllers/email.controller")

emailRouter.post("/",EmailController.sendEmail)
  
module.exports = emailRouter;
