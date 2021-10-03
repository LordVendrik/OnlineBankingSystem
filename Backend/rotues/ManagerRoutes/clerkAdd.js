const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.post("/addClerk", requireLogin, checkforManager, (req, res) => {
  const data = {
    Username: req.body.Username,
    Password: req.body.Password,
    Designation: "Clerk",
  };
  db.query(`insert into staff_login set ?`, data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "success" });
    }
  });
});

module.exports = router;
