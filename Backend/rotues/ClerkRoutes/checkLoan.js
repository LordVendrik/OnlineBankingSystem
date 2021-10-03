const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

var addPrev = (money) => {
  db.query(`select availableBalance from bankdetails`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const prevData = data[0].availableBalance + money;

      db.query(
        `insert into previousBalance set ?`,
        { history: prevData },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
    }
  });
};

router.get("/checkLoan", requireLogin, checkforClerk, (req, res) => {
  db.query("select * from customerproducts", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.map((d) => {
        if (d.timeRemaining == 0) {
          db.query(
            `delete from customerproducts where LoanId = ${d.LoanId}`,
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log("loan removed");
                res.json({ message: "deleted" });
              }
            }
          );
        } else {
          db.query(
            `select * from product where productid = ${d.productid}`,
            (err, data2) => {
              if (err) {
                console.log(err);
              } else {
                const SI =
                  (d.Amount * data2[0].interest * data2[0].time_in_Months) /
                  100;

                const money =
                  d.Amount / data2[0].time_in_Months +
                  SI / data2[0].time_in_Months;

                const CurrentDate = new Date().getDate();
                const CurrentMinutes = new Date().getMinutes();
                const CurrentHour = new Date().getHours();
                const date =
                  new Date().getFullYear() +
                  "-" +
                  (new Date().getMonth() + 1 < 10
                    ? "0" + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1) +
                  "-" +
                  (CurrentDate < 10 ? "0" + CurrentDate : CurrentDate);

                const time =
                  (CurrentHour < 10 ? "0" + CurrentHour : CurrentHour) +
                  ":" +
                  (CurrentMinutes < 10 ? "0" + CurrentMinutes : CurrentMinutes);

                db.query(
                  `update customeraccounts set Amount = Amount - ${money} where Accountno = ${d.Accountno}`,
                  (err, data3) => {
                    if (err) {
                      console.log(err);
                    } else {
                      const transactionDone = {
                        transferfrom: d.Accountno,
                        amount: money,
                        transferedto: "Bank",
                        date: date,
                        time: time,
                        remarks: "Monthly Amount Deducted",
                        ifsccode: "asdasd123123",
                      };

                      db.query(
                        "Insert into transactions set ?",
                        transactionDone,
                        (err) => {
                          if (err) {
                            console.log(err);
                          } else {
                            const CurrentDate = new Date().getDate();
                            const date =
                              new Date().getFullYear() +
                              "-" +
                              (new Date().getMonth() + 1 < 10
                                ? "0" + (new Date().getMonth() + 1)
                                : new Date().getMonth() + 1) +
                              "-" +
                              (CurrentDate < 10
                                ? "0" + CurrentDate
                                : CurrentDate);

                            console.log(date);

                            db.query(
                              `update customerproducts set Date = '${date}',timeRemaining = timeRemaining - 1 where LoanId = ${d.LoanId}`,
                              (err, result2) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  db.query(
                                    `update bankdetails set availableBalance = availableBalance + ${money}`,
                                    (err, result3) => {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        console.log(result3);
                                        res.json({ message: "success" });
                                        addPrev(money);
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
            }
          );
        }
      });
    }
  });
});

module.exports = router;
