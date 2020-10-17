const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserProjectSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
});

const UserProjectModel = mongoose.model("userProject", UserProjectSchema);

module.exports = UserProjectModel;
