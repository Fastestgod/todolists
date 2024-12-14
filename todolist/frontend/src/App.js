import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/api/tasks").then((res) => setTasks(res.data));
  }, []);

  const addTask = (title) => {
    axios.post("/api/tasks", { title }).then((res) => setTasks([...tasks, res.data]));
  };

  const updateTask = (id, updates) => {
    axios.patch(`/api/tasks/${id}`, updates).then((res) => {
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
