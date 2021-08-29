const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

router.get(
  "/declineTransaction/:id",
  requirelogin,
  checkforClerk,
  (req, res) => {
    const id = req.params.id;

    db.query(
      `delete from transferrequest where transaction_id = ${id}`,
      (err) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("delete");
          res.json({ message: "done" });
        }
      }
    );
  }
);

module.exports = router;
