const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a task schema
const taskSchema = new mongoose.Schema({
  title: String,
  done: { type: Boolean, default: false },
});

// Create a task model
const Task = mongoose.model("Task", taskSchema);

// API route to get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Error retrieving tasks.");
  }
});

// API route to create a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;  // Get task title from the request body
    const newTask = new Task({ title });
    await newTask.save(); // Save task to the database
    res.json(newTask);  // Return the new task
  } catch (error) {
    res.status(500).send("Error adding task.");
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
