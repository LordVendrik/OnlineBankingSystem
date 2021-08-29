const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.get(
  "/customertransactionsList/:id",
  requirelogin,
  checkforCustomer,
  (req, res) => {
    const id = req.params.id;
    db.query(
      `select * from transactions where transferfrom = ${id} or transferedto = ${id} order by date desc limit 10`,
      (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          return res.json({ list: result });
        }
      }
    );
  }
);

module.exports = router;
