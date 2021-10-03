const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");
const transporter = require("../auth/CredentialsForMail");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

router.get("/ManagerApprove/:id", requireLogin, checkforManager, (req, res) => {
  const id = req.params.id;

  db.query(
    `select * from newaccountrequestmanager where request_id = ${id}`,
    (err, data) => {
      const email = data[0].Emailid;

      const customeraccount = {
        Accountno: Date.now(),
        AccountType: data[0].AccountType,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        phoneno: data[0].phoneno,
        State: data[0].State,
        pincode: data[0].pincode,
        Emailid: data[0].Emailid,
        alternaivephoneno: data[0].Alternaivephoneno,
        aadharno: data[0].aadharno,
        pancardno: data[0].pancardno,
        Gender: data[0].Gender,
        Colony: data[0].Colony,
        Houseno: data[0].Houseno,
        District: data[0].District,
        photo: data[0].photo,
        adharcardPhoto: data[0].adharcardPhoto,
        signaturephoto: data[0].signaturephoto,
        DOB: data[0].DOB,
        Amount: data[0].initialAmount,
      };

      db.query("Insert into customeraccounts set ?", customeraccount, (err) => {
        if (err) {
          return console.log(err);
        }

        db.query(
          `select Accountno from customeraccounts where adharcardPhoto = '${
            "adhar-" + data[0].aadharno + "-" + data[0].Username + ".jpg"
          }'`,
          (err, data2) => {
            if (err) {
              return console.log(err);
            }

            bcrypt.hash(data[0].password, 5, function (err, hash) {
              if (err) {
                console.log(err);
              } else {
                const Cutomerlogin = {
                  Username: data[0].Username,
                  Password: hash,
                  Accountno: data2[0].Accountno,
                };

                db.query(
                  "insert into customer_login set ?",
                  Cutomerlogin,
                  (err) => {
                    if (err) {
                      return console.log(err);
                    }

                    db.query(
                      `delete from newaccountrequestmanager where request_id = ${id}`,
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          var mailOptions = {
                            from: "sidhant.seraphic@gmail.com",
                            to: email,
                            subject: "Account Request Accepted",
                            text: `Your Account request is Created Please login with your provided username and password`,
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

                    console.log("done");
                  }
                );
              }
            });
          }
        );
      });
    }
  );
});

router.post(
  "/approveLoan/:id/:EmailId",
  requireLogin,
  checkforManager,
  (req, res) => {
    const id = req.params.id;
    const email = req.params.EmailId;

    const CurrentDate = new Date().getDate();
    const date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "-" +
      (CurrentDate < 10 ? "0" + CurrentDate : CurrentDate);

    const time = new Date().getHours() + ":" + new Date().getMinutes();

    const transactionDone = {
      transferfrom: "Bank",
      amount: req.body.Amount,
      transferedto: req.body.accountno,
      date: date,
      time: time,
      remarks: "Transfered from loan",
      ifsccode: "asdas123123",
    };

    db.query("Insert into customerproducts set ?", req.body, (err) => {
      if (err) {
        console.log(err);
        res.json({ error: "something went wrong" });
      } else {
        db.query(`select * from loandata where LoanId = ${id}`, (err, d) => {
          if (err) {
            console.log(err);
          } else {
            const incomeproofphoto = path.join(
              __dirname,
              `../../uploads/${d[0].incomeproofphoto + ".jpg"}`
            );

            fs.unlink(incomeproofphoto, (err) => {
              if (err) {
                return res.json({ error: err });
              } else {
                db.query(`delete from loandata where LoanId = ${id}`, (err) => {
                  if (err) {
                    console.log(err);
                    res.json({ error: "something went wrong" });
                  } else {
                    db.query(
                      `update customeraccounts set Amount = Amount + ${req.body.Amount} where Accountno = ${req.body.accountno}`,
                      (err, result3) => {
                        if (err) {
                          console.log(err);
                          res.json({ error: "something went wrong" });
                        } else {
                          db.query(
                            "insert into transactions set ?",
                            transactionDone,
                            (err, result4) => {
                              if (err) {
                                console.log(err);
                                res.json({ error: "something went wrong" });
                              } else {
                                db.query(
                                  `update bankdetails set availableBalance = availableBalance - ${req.body.Amount}`,
                                  (err, result5) => {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      console.log(result5);

                                      var mailOptions = {
                                        from: "sidhant.seraphic@gmail.com",
                                        to: email,
                                        subject: "Loan Request Accepted",
                                        text: `Your Loan request is Accepted`,
                                      };

                                      transporter.sendMail(
                                        mailOptions,
                                        (err, info) => {
                                          if (err) {
                                            console.log(err);
                                          } else {
                                            console.log(info);
                                            res.json({ message: "success" });
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
  }
);

module.exports = router;
