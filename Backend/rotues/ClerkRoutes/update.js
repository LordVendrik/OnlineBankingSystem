const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

router.post("/updateproduct", requireLogin, checkforClerk, (req, res) => {
  const product = {
    interest: req.body.interest,
    time_in_Months: req.body.time_in_Months,
  };

  db.query(
    `update product set interest = ${product.interest}, time_in_Months = ${product.time_in_Months} where productType = '${req.body.productType}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ error: "error" });
      } else {
        res.json({ message: "done" });
      }
    }
  );
});

module.exports = router;
