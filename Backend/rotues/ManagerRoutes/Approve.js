const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get("/ManagerApprove/:id", requireLogin, checkforManager, (req, res) => {
  const id = req.params.id;

  db.query(
    `select * from newaccountrequestmanager where request_id = ${id}`,
    (err, data) => {
      const customeraccount = {
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
          `select Accountno from customeraccounts where aadharno = ${data[0].aadharno}`,
          (err, data2) => {
            if (err) {
              return console.log(err);
            }

            const Cutomerlogin = {
              Username: data[0].Username,
              Password: data[0].password,
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
                      res.json({ message: result });
                    }
                  }
                );

                console.log("done");
              }
            );
          }
        );
      });
    }
  );
});

module.exports = router;
