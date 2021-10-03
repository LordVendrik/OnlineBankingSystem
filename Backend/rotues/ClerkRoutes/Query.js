const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requirelogin = require("../../middlewares/requireLogin");
const checkforClerk = require("../../middlewares/checkforClerk");

router.get("/cquerr", requirelogin, checkforClerk, (req, res) => {
  console.log("cquery");
  db.query("select * from cquerries where Answer is null", (err, result) => {
    if (err) {
      console.log("cquery1");
      res.json({ error: err });
    } else {
      console.log("cquery2");
      console.log(result);
      res.json({ list: result });
    }
  });
});

router.post(
  "/AnswerQuerryclerk/:id",
  requirelogin,
  checkforClerk,
  (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    db.query(
      `update cquerries set Answer='${req.body.Answer}' where QueryNO=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.json({ error: err });
        } else {
          res.json({ message: result });
        }
      }
    );
  }
);

router.get("/cquerr/:id", requirelogin, checkforClerk, (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  db.query(`select * from cquerries where QueryNO=${id}`, (err, result) => {
    if (err) {
      console.log(error);
      res.json({ error: err });
    } else {
      console.log("in Q2");
      console.log(result);
      res.json({ list: result[0] });
    }
  });
});

module.exports = router;
