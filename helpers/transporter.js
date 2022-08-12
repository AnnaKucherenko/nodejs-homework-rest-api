const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const {META_PASSWORD} = process.env;

const nodemailerConfig ={
    host: "smtp.meta.ua",
    port: 465, 
    secure: true,
    auth:{
        user: "annakucherenko31@meta.ua",
        pass: META_PASSWORD,
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

module.exports = transporter;