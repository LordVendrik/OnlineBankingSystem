const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");
const transporter = require("../auth/CredentialsForMail");

router.post("/Notification", requireLogin, checkforManager, (req, res) => {
  db.query(
    `select Emailid from customeraccounts where Accountno = ${req.body.accountno}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length === 0) {
        return res.json({ error: "No account with this account number found" });
      } else {
        var mailOptions = {
          from: "sidhant.seraphic@gmail.com",
          to: result[0].Emailid,
          subject: "Message from VCF Bank",
          text: `${req.body.Notification}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
            res.json({ message: "successfully sent notification" });
          }
        });
      }
    }
  );
});

module.exports = router;
