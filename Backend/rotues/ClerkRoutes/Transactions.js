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

router.get(
  "/transationDetails/:id",
  requirelogin,
  checkforClerk,
  (req, res) => {
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
  }
);

router.post("/checkDetails", requirelogin, checkforClerk, (req, res) => {
  let name = req.body.name;
  name = name.replace(/ +/g, "");
  console.log(name);
  const accountno = req.body.accountno;

  db.query(
    `select firstname,lastname from customeraccounts where Accountno = ${accountno}`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ error: err });
      } else if (result[0].length === 0) {
        return res.json({ message: "No user found" });
      } else if (
        result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase() !==
        name.toLowerCase()
      ) {
        return res.json({ message: "Wrong Credentials" });
      } else {
        return res.json({ message: "Details Successfully found" });
      }
    }
  );
});

module.exports = router;
