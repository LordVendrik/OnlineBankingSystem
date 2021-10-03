const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.post("/requestDeletion", requirelogin, checkforCustomer, (req, res) => {
  db.query("insert into DeleteAccount set ?", req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "success" });
    }
  });
});

module.exports = router;
