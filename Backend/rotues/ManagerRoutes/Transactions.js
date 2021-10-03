const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get(
  "/transactionsManagerr",
  requirelogin,
  checkforManager,
  (req, res) => {
    db.query("select * from transactions", (err, result) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ list: result });
      }
    });
  }
);

module.exports = router;
