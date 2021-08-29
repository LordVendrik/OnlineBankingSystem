const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

router.get("/transactionlist", requirelogin, checkforClerk, (req, res) => {
  db.query("select * from transferrequest", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    } else {
      res.json({ list: result });
    }
  });
});

router.get("/transationDetails/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    `select * from transferrequest where transaction_id = ${id}`,
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      db.query(
        `select * from customeraccounts where accountno = ${data[0].transferfrom}`,
        (err, data2) => {
          if (err) {
            return console.log(err);
          }

          db.query(
            `select * from customeraccounts where accountno = ${data[0].beneficiaryaccountno}`,
            (err, data3) => {
              if (err) {
                return console.log(err);
              }

              res.json({
                details: {
                  sender: data2[0],
                  transaction: data[0],
                  Receiver: data3[0],
                },
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
