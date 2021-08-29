//jshint esversion:6
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const requireLogin = require("../../middlewares/requireLogin");

router.get("/checkCustomerType", requireLogin, (req, res) => {
  if (req.cookies.CustomerType === "Manager") {
    res.json({ message: "Manager" });
  } else if (req.cookies.CustomerType === "Clerk") {
    res.json({ message: "Clerk" });
  } else if (req.cookies.CustomerType === "Customer") {
    res.json({ message: "Customer" });
  } else {
    res.json({ error: "Wrong page" });
  }
});

module.exports = router;
