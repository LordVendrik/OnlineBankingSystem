module.exports = (req, res, next) => {
  const CustomerType = req.cookies.CustomerType;
  if (CustomerType != "Customer") {
    return res.json({ error: "not logged in" });
  } else {
    next();
  }
};
