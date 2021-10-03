const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get("/details", requireLogin, checkforManager, (req, res) => {
  let totalCustomers = 0;
  let availableBalance = 0;
  let loanUsers = 0;

  db.query("select * from customeraccounts", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      totalCustomers = data.length;

      db.query("select * from bankDetails", (err, data2) => {
        if (err) {
          console.log(err);
        } else {
          availableBalance = data2[0].availableBalance;

          db.query("select * from customerproducts", (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              loanUsers = data3.length;

              res.json({
                availableBalance: availableBalance,
                totalCustomers: totalCustomers,
                loanUsers: loanUsers,
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
