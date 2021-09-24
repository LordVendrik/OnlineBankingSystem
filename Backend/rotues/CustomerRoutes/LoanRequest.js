const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.post("/cheks", requirelogin, checkforCustomer, (req, res) => {
  console.log(req.body);

  const data = {
    LoanType: req.body.LoanType,
    AccountType: req.body.AccountType,
    firstName: req.body.firstName,
    Middlename: req.body.Middlename,
    Lastname: req.body.Lastname,
    DOB: req.body.DOB,
    Emailid: req.body.Emailid,
    Mobileno: req.body.Mobileno,
    Aadhaarno: req.body.Aadhaarno,
    Pancardno: req.body.Pancardno,
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    Pincode: req.body.Pincode,
    Incomesource: req.body.Incomesource,
    Annualincome: req.body.Annualincome,
    Wantloan: req.body.Wantloan,
    Howlong: req.body.Howlong,
    accountno: req.body.accountno,
    productType: req.body.productType,
  };

  db.query("insert into loanData set ?", data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("done" + result);
      res.json({ r: result });
    }
  });
});

module.exports = router;
