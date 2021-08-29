const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  jwt.verify(token, "this is my secret", (err) => {
    if (err) {
      return res.json({ error: "not logged in" });
    } else {
      next();
    }
  });
};
