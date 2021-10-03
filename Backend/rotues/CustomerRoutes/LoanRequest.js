const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.body.Username +
        "-" +
        req.body.datetime +
        path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.post(
  "/cheks",
  requirelogin,
  checkforCustomer,
  upload.single("incomeproofphoto"),
  (req, res) => {
    console.log(req.body);

    const data = {
      LoanType: req.body.LoanType,
      Emailid: req.body.Emailid,
      Annualincome: req.body.Annualincome,
      incomeproofphoto:
        "incomeproofphoto-" + req.body.Username + "-" + req.body.datetime,
      Incomesource: req.body.Incomesource,
      loanamount: req.body.Wantloan,
      accountno: req.body.accountno,
      timeRemaining: req.body.timeRemaining,
    };

    db.query("insert into loanData set ?", data, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("done" + result);
        res.json({ message: "successfull" });
      }
    });
  }
);

module.exports = router;
