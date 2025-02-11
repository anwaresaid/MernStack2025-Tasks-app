const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: String,
    status: {
      type: String,
      enum: ["todo", "started", "completed"],
      default: "todo",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Tasks", TaskSchema);

module.exports = Task;
