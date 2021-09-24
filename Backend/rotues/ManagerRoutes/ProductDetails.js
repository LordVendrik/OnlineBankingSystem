const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get("/productDetails", requireLogin, checkforManager, (req, res) => {
  db.query("select * from loandata", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ data: result });
    }
  });
});

module.exports = router;
