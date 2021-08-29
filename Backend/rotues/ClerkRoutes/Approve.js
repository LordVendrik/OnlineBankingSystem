const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

router.get("/Approve/:id", requireLogin, checkforClerk, (req, res) => {
  const id = req.params.id;

  db.query(
    `insert into newaccountrequestmanager (select * from newaccountrequestclerk where request_id = ${id});`,
    (err, data) => {
      if (err) {
        return console.log(err);
      }

      console.log(data);
      db.query(
        `delete from newaccountrequestclerk where request_id = ${id}`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ message: result });
          }
        }
      );
    }
  );
});

module.exports = router;
