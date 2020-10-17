const express = require("express");

const auth = require("./auth");
const user = require("./user");
const project = require("./project");

const app = express();

app.use("/auth", auth);
app.use("/user", user);
app.use("/project", project);

module.exports = app;
