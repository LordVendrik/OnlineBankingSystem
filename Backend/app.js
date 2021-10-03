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
app.use(require("./rotues/auth/checkUsers"));

//Clerk Routes
app.use(require("./rotues/ClerkRoutes/NewAccount"));
app.use(require("./rotues/sendimages/sendimage"));
app.use(require("./rotues/ClerkRoutes/Decline"));
app.use(require("./rotues/ClerkRoutes/Approve"));
app.use(require("./rotues/ClerkRoutes/Transactions"));
app.use(require("./rotues/ClerkRoutes/DeclineTransaction"));
app.use(require("./rotues/ClerkRoutes/ApproveTransaction"));
app.use(require("./rotues/ClerkRoutes/checkLoan"));
app.use(require("./rotues/ClerkRoutes/Query"));
app.use(require("./rotues/ClerkRoutes/update"));

//Manager Routes
app.use(require("./rotues/ManagerRoutes/FinallyApproveAccount"));
app.use(require("./rotues/ManagerRoutes/Decline"));
app.use(require("./rotues/ManagerRoutes/Approve"));
app.use(require("./rotues/ManagerRoutes/ProductDetails"));
app.use(require("./rotues/ManagerRoutes/LoanDetails"));
app.use(require("./rotues/ManagerRoutes/sendNotification"));
app.use(require("./rotues/ManagerRoutes/Delete"));
app.use(require("./rotues/ManagerRoutes/Transactions"));
app.use(require("./rotues/ManagerRoutes/BankDetails"));
app.use(require("./rotues/ManagerRoutes/bankData"));
app.use(require("./rotues/ManagerRoutes/clerkAdd"));

//Customer Routes
app.use(require("./rotues/CustomerRoutes/TransactionRequest"));
app.use(require("./rotues/CustomerRoutes/TransactionsList"));
app.use(require("./rotues/CustomerRoutes/LoanRequest"));
app.use(require("./rotues/CustomerRoutes/sendQuery"));
app.use(require("./rotues/CustomerRoutes/RequestDeletion"));
app.use(require("./rotues/CustomerRoutes/Update"));

//Products Routes
app.use(require("./rotues/Products/GetProducts"));

app.listen(5000, () => {
  console.log("listening on port 5000");
});
