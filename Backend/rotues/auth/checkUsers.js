const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require("../DBConnection/Connection");

router.get("/checkUsername", (req, res) => {
  db.query(
    "select Username from customer_login union select Username from newaccountrequestclerk union select Username from newaccountrequestmanager",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ users: result });
      }
    }
  );
});

module.exports = router;
