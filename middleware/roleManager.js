const jwt = require("jsonwebtoken");

const roleManager = (req, res, next) => {
  try {
    const token = (req.headers.authorization
      ? req.headers.authorization
      : req.cookies.Authorization
    ).split(" ")[1];
    
    const decoded = jwt.verify(token, "TOP_SECRET");
    if (decoded["user"].role == "manager"){
        next();
    }
    else{
      return res.redirect("/")
    }
  } catch (error) {
    return res.redirect("/");
  }
};

module.exports = {
    roleManager,
};
