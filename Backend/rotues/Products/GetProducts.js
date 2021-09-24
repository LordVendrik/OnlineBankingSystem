const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.get("/requestProducts", requirelogin, checkforCustomer, (req, res) => {
  db.query("select * from product", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ err: err });
    } else {
      res.json({ list: result });
    }
  });
});

module.exports = router;
