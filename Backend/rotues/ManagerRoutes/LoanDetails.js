const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get("/loanDetails/:id", requireLogin, checkforManager, (req, res) => {
  const id = req.params.id;

  db.query(`select * from loandata where LoanId = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        `select * from product where productType = '${result[0].LoanType}'`,
        (err, result2) => {
          if (err) {
            console.log(err);
          } else {
            db.query(
              `select * from customeraccounts where Accountno=${result[0].accountno}`,
              (err, result3) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json({
                    data: result[0],
                    productdata: result2[0],
                    customerdata: result3[0],
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

module.exports = router;
