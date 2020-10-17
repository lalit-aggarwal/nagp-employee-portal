const express = require("express");
const app = express();
const User = require("../models/user");
const { loggedIn } = require("../middleware/auth");

app.get("/", loggedIn, async (req, res) => {
  const user = await User.find({"email": req.userData.user.email}).exec();
  res.render("profile", {user: user
  });
});

module.exports = app;