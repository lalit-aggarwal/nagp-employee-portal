const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const User = require("../models/user");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/users')
  },
  filename: (req, file, cb) => {
    const uniqueFileId = uuidv4();
    cb(null, uniqueFileId + path.extname(file.originalname))
  }
});

//will be using this for uplading
const upload = multer({ storage: storage });

app.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return res.redirect("/");
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email, role: user.role };
        const token = jwt.sign({ user: body }, "TOP_SECRET");
        res.cookie('Authorization', "bearer " + token, { httpOnly: true });
        return res.redirect("/project");
      });
    } catch (error) {
      return res.redirect("/");
    }
  })(req, res, next);
});

app.get("/logout", async (req, res, next) => {
  req.logout();
  res.clearCookie('Authorization');
  res.redirect('/');
});

app.post("/register", upload.single('profileImage'), async (req, res) => {
  const data = new User(req.body);
  if (req.file && req.file.filename) {
    data.image = req.file.filename;
  }
  await data
    .save()
    .then((data) => res.redirect("/"))
    .catch((errors) =>
      res.render("register", {
        errors,
      })
    );
});

module.exports = app;
