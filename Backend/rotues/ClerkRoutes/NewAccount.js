const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.body.AadharNo +
        "-" +
        req.body.Username +
        path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.post(
  "/application",
  upload.fields([{ name: "photo" }, { name: "adhar" }, { name: "signature" }]),
  (req, res) => {
    const newapplication = {
      AccountType: req.body.AccountType,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      phoneno: req.body.Phoneno,
      State: req.body.State,
      pincode: req.body.Pincode,
      Username: req.body.Username,
      Emailid: req.body.EmailId,
      Alternaivephoneno: req.body.AlternativePhone,
      AadharNo: req.body.AadharNo,
      Pancardno: req.body.Pancard,
      Gender: req.body.Gender,
      Colony: req.body.Colony,
      Houseno: req.body.Houseno,
      District: req.body.District,
      photo: "photo-" + req.body.AadharNo + "-" + req.body.Username + ".jpg",
      adharcardphoto:
        "adhar-" + req.body.AadharNo + "-" + req.body.Username + ".jpg",
      signaturephoto:
        "signature-" + req.body.AadharNo + "-" + req.body.Username + ".jpg",
      password: req.body.Password,
      DOB: req.body.DOB,
      initialAmount: req.body.intialAmount,
    };

    db.query(
      "INSERT INTO newaccountrequestclerk SET ?",
      newapplication,
      (err, result) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json({
            message:
              "Application submitted!!! account creation in process we will send you mail after creation of account",
          });
        }
      }
    );
  }
);

router.get("/applicationsClerk", requirelogin, checkforClerk, (req, res) => {
  db.query("select * from newaccountrequestclerk", (err, result) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ list: result });
    }
  });
});

router.get(
  "/applicationsClerk/:id",
  requirelogin,
  checkforClerk,
  (req, res) => {
    const request_id = req.params.id;
    db.query(
      `select * from newaccountrequestclerk where request_id = '${request_id}'`,
      (err, result) => {
        if (err) {
          res.json({ error: "not found" });
        } else {
          res.json({ details: result[0] });
        }
      }
    );
  }
);

module.exports = router;
