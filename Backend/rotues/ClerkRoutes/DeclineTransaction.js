const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");
const transporter = require("../auth/CredentialsForMail");

router.get(
  "/declineTransaction/:id/:reason/:EmailId",
  requirelogin,
  checkforClerk,
  (req, res) => {
    const id = req.params.id;
    const reason = req.params.reason;
    const email = req.params.EmailId;

    db.query(
      `delete from transferrequest where transaction_id = ${id}`,
      (err) => {
        if (err) {
          return console.log(err);
        } else {
          var mailOptions = {
            from: "sidhant.seraphic@gmail.com",
            to: email,
            subject: "Transaction Request Declined",
            text: `Your Transaction request is declined 
                    Reason is : ${reason}`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
              res.json({ message: "done" });
            }
          });
        }
      }
    );
  }
);

module.exports = router;
