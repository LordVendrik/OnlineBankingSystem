const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");
const checkforCustomer = require("../../middlewares/checkforCustomer");
const db = require("../DBConnection/Connection");

router.post("/sback", requirelogin, checkforCustomer, (req, res) => {
  console.log(req.body);

  db.query("INSERT INTO cquerries SET ?", req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ error: "something went wrong" });
    } else {
      console.log("submitted" + result);
      res.json({ message: "submitted" });
    }
  });
});

router.get("/cqd/:id", requirelogin, checkforCustomer, (req, res) => {
  const id = req.params.id;

  console.log(id);
  db.query(
    `select * from cquerries where (Answer is not null) and( Accountno='${id}')`,
    (err, result) => {
      console.log("s");
      if (err) {
        console.log("s1");
        console.log(err);
        res.json({ error: err });
      } else {
        console.log(result);
        console.log("s2");
        res.json({ list: result });
      }
    }
  );
});

module.exports = router;
