const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const checkforstaff = require("../../middlewares/checkforstaff");
const requirelogin = require("../../middlewares/requireLogin");

router.get("/image/:name", requirelogin, checkforstaff, (req, res) => {
  const filename = req.params.name;
  if (filename != undefined) {
    const p = path.join(__dirname, `../../uploads/${filename}`);

    const readstream = fs.createReadStream(p);
    readstream.pipe(res);
  }
});

module.exports = router;
