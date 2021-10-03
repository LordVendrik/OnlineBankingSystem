const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sidhant.seraphic@gmail.com",
    pass: "Seraphic1999",
  },
});

module.exports = transporter;
