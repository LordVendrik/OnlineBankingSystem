const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.post("/Update", requirelogin, checkforCustomer, (req, res) => {
  const data = {
    firstname: req.body.Firstname,
    lastname: req.body.LastName,
    phoneno: req.body.Mobileno,
    State: req.body.State,
    pincode: req.body.Pincode,
    Emailid: req.body.EmailId,
    Colony: req.body.colony,
    District: req.body.District,
    DOB: req.body.DOB,
  };

  db.query(
    `update customeraccounts set ? where Accountno = '${req.body.Accountno}'`,
    data,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "successfull" });
      }
    }
  );
});

module.exports = router;
