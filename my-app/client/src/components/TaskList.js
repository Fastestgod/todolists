// client/src/components/TaskList.js
import React from "react";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.title}
          <button onClick={() => onUpdate(task._id, { title: "Updated Task" })}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
