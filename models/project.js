const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed"],
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("project", ProjectSchema);

module.exports = ProjectModel;
