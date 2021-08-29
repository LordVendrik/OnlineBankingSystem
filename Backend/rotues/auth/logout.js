const express = require("express");
const router = express.Router();
const requirelogin = require("../../middlewares/requireLogin");

router.get("/logout", requirelogin, (req, res) => {
  res.cookie("jwt", "");
  res.cookie("CustomerType", "");
  res.cookie("loggedin", "");
  res.json({ message: "loggedout" });
});

module.exports = router;
