const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const { register, login } = require("./controllers/registerController.js");

const Task = require("./models/task.model.js");
const authMiddleware = require("./middleware/auth.js"); // Import the auth middleware

mongoose
  .connect(
    "mongodb+srv://admin:3Ksdbmqvjv1YNeNN@backend-db.trr23.mongodb.net/casestudy-api?retryWrites=true&w=majority&appName=backend-db"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("connection fails"));

// mongoose.connect(`${CONNECTION_STRING}`)
//   .then(() => console.log('Connected!'));

app.get("/", (req, res) => {
  res.send("Hello World here there");
});

//auth api
app.post("/api/register", register);
app.post("/api/login", login);

app.use(authMiddleware);

//create tasks
app.post("/api/tasks", async (req, res) => {
  try {
    const createdBy = req.user._id; // Assuming the auth middleware adds the user to the request
    req.body.createdBy = createdBy;
    const task = await Task.create(req.body);

    task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//edit task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to edit this task" });
    }
    Object.assign(task, req.body);
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this task" });
    }
    await task.deleteOne(); // Use deleteOne method on the document instance
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find(); // Admin can see all tasks
    } else {
      tasks = await Task.find({ createdBy: req.user._id }); // Regular users can see only their tasks
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
