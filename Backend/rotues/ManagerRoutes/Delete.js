const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");
const fs = require("fs");
const path = require("path");

router.get(
  "/deleteaccountsManager",
  requirelogin,
  checkforManager,
  (req, res) => {
    db.query("select * from DeleteAccount", (err, result) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ list: result });
      }
    });
  }
);

router.get(
  "/deleteaccountsManager/:id",
  requirelogin,
  checkforManager,
  (req, res) => {
    const request_id = req.params.id;
    db.query(
      `select * from customeraccounts where Accountno= '${request_id}'`,
      (err, result) => {
        if (err) {
          res.json({ error: "not found" });
        } else {
          res.json({ details: result[0] });
        }
      }
    );
  }
);

router.get("/ManagerDelete/:id", requirelogin, checkforManager, (req, res) => {
  const id = req.params.id;

  db.query(
    `select photo,adharcardPhoto,signaturephoto from customeraccounts where Accountno = '${id}'`,
    (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: err });
      } else {
        const photopath = path.join(
          __dirname,
          `../../uploads/${data[0].photo}`
        );
        const adharpath = path.join(
          __dirname,
          `../../uploads/${data[0].adharcardPhoto}`
        );
        const signaturepath = path.join(
          __dirname,
          `../../uploads/${data[0].signaturephoto}`
        );

        fs.unlink(photopath, (err) => {
          if (err) {
            return res.json({ error: err });
          }
        });

        fs.unlink(adharpath, (err) => {
          if (err) {
            return res.json({ error: err });
          }
        });

        fs.unlink(signaturepath, (err) => {
          if (err) {
            return res.json({ error: err });
          }
        });

        db.query(
          `delete from customer_login where Accountno = '${id}'`,
          (err, result) => {
            if (err) {
              res.json({ error: err });
            } else {
              db.query(
                `delete from DeleteAccount where Accountno = '${id}'`,
                (err, result) => {
                  if (err) {
                    res.json({ error: err });
                  } else {
                    db.query(
                      `delete from customeraccounts where Accountno = '${id}'`,
                      (err, result) => {
                        if (err) {
                          res.json({ error: err });
                        } else {
                          res.json({ message: result });
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
});

module.exports = router;
