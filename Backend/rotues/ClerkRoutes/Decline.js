const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");
const fs = require("fs");
const path = require("path");
const transporter = require("../auth/CredentialsForMail");

router.get("/Decline/:id/:reason", requireLogin, checkforClerk, (req, res) => {
  const id = req.params.id;
  const reason = req.params.reason;

  db.query(
    `select photo,adharcardPhoto,signaturephoto,Emailid,Aadharno  from newaccountrequestclerk where request_id = ${id}`,
    (err, data) => {
      if (err) {
        return res.json({ error: err });
      } else {
        const email = data[0].Emailid;

        const photopath = path.join(
          __dirname,
          `../../uploads/${data[0].photo}`
        );
        const adharpath = path.join(
          __dirname,
          `../../uploads/${data[0].adharcardPhoto}`
        );
        const signaturepath = path.join(
          __dirname,
          `../../uploads/${data[0].signaturephoto}`
        );

        fs.unlink(photopath, (err) => {
          if (err) {
            return res.json({ error: err });
          }
        });

        fs.unlink(adharpath, (err) => {
          if (err) {
            return res.json({ error: err });
          }
        });

        fs.unlink(signaturepath, (err) => {
          if (err) {
            return res.json({ error: err });
          }
        });

        db.query(
          `delete from newaccountrequestclerk where request_id = ${id}`,
          (err, result) => {
            if (err) {
              res.json({ error: err });
            } else {
              var mailOptions = {
                from: "sidhant.seraphic@gmail.com",
                to: email,
                subject: "Account Request Declined",
                text: `Your Account request is declined 
                        Reason is : ${reason}`,
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(info);
                  res.json({ message: result });
                }
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
