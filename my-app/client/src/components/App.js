import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State to store new task input value
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    axios.get("/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Function to handle the creation of a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      axios.post("/api/tasks", { title: newTask })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask(""); // Clear the input field
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // Function to handle marking a task as done (or updating task)
  const handleToggleTask = (id, isDone) => {
    const updatedTask = { done: !isDone }; // Toggle the 'done' state
    axios.patch(`/api/tasks/${id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === id ? { ...task, done: response.data.done } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div className="app-container">
      <h1 className="title">Todo List</h1>

      {/* Task Input and Add Button */}
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-task-btn">
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span className={task.done ? "task-done" : ""}>{task.title}</span>
            <div className="task-actions">
              <button
                onClick={() => handleToggleTask(task._id, task.done)}
                className="done-btn"
              >
                {task.done ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
