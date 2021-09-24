const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");
const fs = require("fs");
const path = require("path");

router.get("/ManagerDecline/:id", requireLogin, checkforManager, (req, res) => {
  const id = req.params.id;

  db.query(
    `select photo,adharcardPhoto,signaturephoto from newaccountrequestmanager where request_id = ${id}`,
    (err, data) => {
      if (err) {
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
          `delete from newaccountrequestmanager where request_id = ${id}`,
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
});

router.get("/removeRequest/:id", requireLogin, checkforManager, (req, res) => {
  const id = req.params.id;

  db.query(`delete from loandata where LoanId = '${id}'`, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ error: "error" });
    } else {
      res.json({ message: "deleted" });
    }
  });
});

module.exports = router;
