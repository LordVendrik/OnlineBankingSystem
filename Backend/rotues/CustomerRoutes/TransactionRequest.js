const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.post(
  "/transactionRequest",
  requirelogin,
  checkforCustomer,
  (req, res) => {
    const transaction = {
      amount: req.body.amount,
      beneficiaryaccountno: req.body.beneficiaryaccountnumber,
      beneficiaryifsccode: req.body.beneficiaryifsccode,
      beneficiaryname: req.body.beneficiaryname,
      Confirmbeneficiaryaccountno: req.body.Confirmbeneficiaryaccountnumber,
      remarks: req.body.remarks,
      date: req.body.date,
      time: req.body.time,
      transferfrom: req.body.transferfrom,
      BankType: req.body.BankType,
    };

    db.query(
      `insert into transferrequest set ?`,
      transaction,
      (err, result) => {
        if (err) {
          return res.json({ error: err });
        } else {
          res.json({ message: "successfuly requested" });
        }
      }
    );
  }
);

module.exports = router;
