const jwt = require("jsonwebtoken");

const loggedIn = (req, res, next) => {
  try {
    const token = (req.headers.authorization
      ? req.headers.authorization
      : req.cookies.Authorization
    ).split(" ")[1];
    
    const decoded = jwt.verify(token, "TOP_SECRET");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.redirect("/");
  }
};

module.exports = {
  loggedIn,
};
