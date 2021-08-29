const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get(
  "/applicationsManager",
  requirelogin,
  checkforManager,
  (req, res) => {
    db.query("select * from newaccountrequestmanager", (err, result) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json({ list: result });
      }
    });
  }
);

router.get(
  "/applicationsManager/:id",
  requirelogin,
  checkforManager,
  (req, res) => {
    const request_id = req.params.id;
    db.query(
      `select * from newaccountrequestmanager where request_id = '${request_id}'`,
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

module.exports = router;
