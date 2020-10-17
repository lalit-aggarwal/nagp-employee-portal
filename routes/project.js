const express = require("express");
const app = express();
const Project = require("../models/project");
const User = require("../models/user");
const UserProject = require("../models/userProject");
const { loggedIn } = require("../middleware/auth");

app.get("/", loggedIn, async (req, res) => {
  const projects = await Project.find().exec();
  const user = await User.find({"email": req.userData.user.email}).exec();
  const userProjects = await UserProject.find({'userId': user[0]._id}).exec();
  res.render("index", {
    projects:projects, user: user[0], userId: user[0]._id, userProjects: userProjects
  });
});

app.get("/:id", loggedIn, async (req, res) => {
  const project = await Project.find( { "_id" : req.params.id } ).exec();
  const user = await User.find({"email": req.userData.user.email}).exec()
  const projectCreatedBy = await User.find({"email": project[0].createdBy}).exec()
  const userProjects = await UserProject.find({'userId': user[0]._id, 'projectId': req.params.id}).exec();
  res.render("job-single", {
    project:project, user: user, isApplied: userProjects.length > 0, projectCreatedBy: projectCreatedBy[0].name
  });
});

app.get("/update/:id", loggedIn, async (req, res) => {
  const project = await Project.find( { "_id" : req.params.id } ).exec();
  const user = await User.find({"email": req.userData.user.email}).exec()
  res.render("addupdateopening", {
    project:project, user: user, operation:"update"
  });
});

app.post("/", loggedIn, async (req, res) => {
  const data = new Project(req.body);
  const user = await User.find({"email": req.userData.user.email}).exec()
  data['status'] = 'open'
  data['createdBy'] = user[0].email
  await data
    .save()
    .then((data) => res.redirect("/project"))
    .catch((errors) => res.send(errors));
  return res.send("done");
});

app.post("/update/:projId", loggedIn, async (req, res) => {
  const data = new Project(req.body);
  var newvalues = { $set: { name: data.name, clientName: data.clientName, tech: data.tech, role: data.role, status: data.status, desc: data.desc } };
  const updateData = await Project.updateOne({"_id": req.params.projId}, newvalues).exec();
  return res.redirect("/project");
});

app.post("/:projId/apply/", loggedIn, async (req, res) => {
  const data = new UserProject(req.body);
  data.projectId = req.params.projId;
  await data
    .save()
    .then((data) => res.redirect("/project"))
    .catch((errors) => res.send(errors));
  return res.send("done");
});

module.exports = app;
