const express = require("express");
const router = express.Router();
const db = require("../DBConnection/Connection");
const requireLogin = require("../../middlewares/requireLogin");
const checkforManager = require("../../middlewares/checkforManager");

router.get("/data", requireLogin, checkforManager, (req, res) => {
  db.query("select history from previousBalance", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const data = [];
      for (let i = 0; i < result.length; i++) {
        data.push(result[i].history - 840);
      }
      res.json({ data: data });
    }
  });
});

module.exports = router;
