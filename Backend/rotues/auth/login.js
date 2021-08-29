//jshint esversion:6
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require("../DBConnection/Connection");

router.post("/login", (req, res) => {
  const { Username, Password, CustomerType } = req.body;

  if (CustomerType === "Customer") {
    db.query(
      `select * from customer_login where Username = '${Username}'`,
      (err, result) => {
        if (err || result.length <= 0) {
          return res.json({ error: "Wrong username or password" });
        } else {
          if (
            Username === result[0].Username &&
            Password === result[0].Password
          ) {
            const user = result[0].Username;

            const token = jwt.sign({ user }, "this is my secret", {
              expiresIn: "30m",
            });

            res.cookie("jwt", token, {
              expires: new Date(Date.now() + 30 * 60 * 1000),
              httpOnly: true,
            });

            res.cookie("CustomerType", CustomerType, {
              expires: new Date(Date.now() + 30 * 60 * 1000),
              httpOnly: true,
            });

            res.cookie("loggedin", "true", {
              expires: new Date(Date.now() + 30 * 60 * 1000),
              httpOnly: false,
            });

            const accno = result[0].Accountno;

            db.query(
              `select * from customeraccounts where accountno = ${accno}`,
              (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json({
                    User: {
                      Accountno: data[0].Accountno,
                      Username: Username,
                      firstName: data[0].firstname,
                      lastName: data[0].lastname,
                      Amount: data[0].Amount,
                      Aadharno: data[0].aadharno,
                      pancardno: data[0].pancardno,
                      CustomerType: CustomerType,
                      AccountType: data[0].AccountType,
                    },
                  });
                }
              }
            );
          } else {
            res.json({ error: "Wrong username or password" });
          }
        }
      }
    );
  } else if (CustomerType === "Clerk" || CustomerType === "Manager") {
    db.query(
      `select * from staff_login where Username = '${Username}'`,
      (err, result) => {
        if (err || result.length <= 0) {
          return res.json({ error: "Wrong username or password" });
        } else {
          if (
            Username === result[0].Username &&
            Password === result[0].Password
          ) {
            const user = result[0].Username;

            const token = jwt.sign({ user }, "this is my secret");

            res.cookie("jwt", token, {
              httpOnly: true,
            });

            res.cookie("CustomerType", CustomerType, {
              httpOnly: true,
            });

            res.cookie("loggedin", "true");

            res.json({ User: { CustomerType: CustomerType } });
          } else {
            res.json({ error: "Wrong username or password" });
          }
        }
      }
    );
  }
});

module.exports = router;
