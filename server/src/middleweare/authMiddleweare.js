const isopensession = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Please login" });
  }
};

module.exports = isopensession;
