const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const { roleManager } = require("./middleware/roleManager");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(express.static("public"));
// Set views
app.set("views", "./views");
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/employee_portal_db");
require("./passport");

const db = mongoose.connection;
db.on("error", () => console.log("connection error"));
db.once("open", function () {
  console.log("Successfully connected to Database!!");
});

app.use(routes);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/add", roleManager, (req, res) => {
  res.render("addupdateopening", {
    operation: "add"
  });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// To handle unavailable routes
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const server = app.listen(8000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log("app listening on port 8000!", host, port);
});
