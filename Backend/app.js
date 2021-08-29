//jshint esversion:6
const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Normal Routes
app.use(require("./rotues/auth/login"));
app.use(require("./rotues/checkCustomerType/CustomerType"));
app.use(require("./rotues/auth/logout"));

//Clerk Routes
app.use(require("./rotues/ClerkRoutes/NewAccount"));
app.use(require("./rotues/sendimages/sendimage"));
app.use(require("./rotues/ClerkRoutes/Decline"));
app.use(require("./rotues/ClerkRoutes/Approve"));
app.use(require("./rotues/ClerkRoutes/Transactions"));
app.use(require("./rotues/ClerkRoutes/DeclineTransaction"));
app.use(require("./rotues/ClerkRoutes/ApproveTransaction"));

//Manager Routes
app.use(require("./rotues/ManagerRoutes/FinallyApproveAccount"));
app.use(require("./rotues/ManagerRoutes/Decline"));
app.use(require("./rotues/ManagerRoutes/Approve"));

//Customer Routes
app.use(require("./rotues/CustomerRoutes/TransactionRequest"));
app.use(require("./rotues/CustomerRoutes/TransactionsList"));

app.listen(5000, () => {
  console.log("listening on port 5000");
});
