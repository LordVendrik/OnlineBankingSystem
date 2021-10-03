const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");
const transporter = require("../auth/CredentialsForMail");

router.get(
  "/approveTransactionSame/:id/:Emailid",
  requireLogin,
  checkforClerk,
  (req, res) => {
    const id = req.params.id;
    const email = req.params.Emailid;
    db.query(
      `select * from transferrequest where transaction_id = ${id}`,
      (err, result) => {
        if (err) {
          return console.log(err);
        }

        console.log(result[0].transferfrom);
        console.log(result[0].beneficiaryaccountno);

        db.query(
          `update customeraccounts set Amount = (Amount - ${result[0].amount}) where Accountno = ${result[0].transferfrom}`,
          (err) => {
            if (err) {
              return console.log(err);
            }

            db.query(
              `update customeraccounts set Amount = (Amount + ${result[0].amount}) where Accountno = ${result[0].beneficiaryaccountno}`,
              (err) => {
                if (err) {
                  return console.log(err);
                }

                const transactionDone = {
                  transferfrom: result[0].transferfrom,
                  amount: result[0].amount,
                  transferedto: result[0].beneficiaryaccountno,
                  date: result[0].date,
                  time: result[0].time,
                  remarks: result[0].remarks,
                  ifsccode: result[0].beneficiaryifsccode,
                };

                db.query(
                  `insert into transactions set ?`,
                  transactionDone,
                  (err) => {
                    if (err) {
                      return console.log(err);
                    }

                    db.query(
                      `delete from transferrequest where transaction_id = ${id}`,
                      (err, r) => {
                        if (err) {
                          return res.json({ error: err });
                        } else {
                          var mailOptions = {
                            from: "sidhant.seraphic@gmail.com",
                            to: email,
                            subject: "Transaction Request Approved",
                            text: `Your Transaction request is Approved`,
                          };

                          transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(info);
                              res.json({ message: r });
                            }
                          });
                        }
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

router.get(
  "/approveTransactionDiff/:id",
  requireLogin,
  checkforClerk,
  (req, res) => {
    const id = req.params.id;

    //AFTER CONFIRMING FROM ANOTHER BANK BY SENDING DETAILS OF PERSON
    //THE TRANSACTION WILL PROCEED. OTHER BANK WILL ADD THE AMOUNT IN
    // BENEFICIARY ACCOUNT WE HAVE TO DEDUCE THE AMOUNT FROM OUR CUSTOMER.

    db.query(
      `select * from transferrequest where transaction_id = ${id}`,
      (err, result) => {
        if (err) {
          return console.log(err);
        }

        console.log(result[0].transferfrom);
        console.log(result[0].beneficiaryaccountno);

        db.query(
          `update customeraccounts set Amount = (Amount - ${result[0].amount}) where Accountno = ${result[0].transferfrom}`,
          (err) => {
            if (err) {
              return console.log(err);
            }

            const transactionDone = {
              transferfrom: result[0].transferfrom,
              amount: result[0].amount,
              transferedto: result[0].beneficiaryaccountno,
              date: result[0].date,
              time: result[0].time,
              remarks: result[0].remarks,
              ifsccode: result[0].beneficiaryifsccode,
            };

            db.query(
              `insert into transactions set ?`,
              transactionDone,
              (err) => {
                if (err) {
                  return console.log(err);
                }

                db.query(
                  `delete from transferrequest where transaction_id = ${id}`,
                  (err, r) => {
                    if (err) {
                      return res.json({ error: err });
                    } else {
                      return res.json({ message: r });
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

module.exports = router;
