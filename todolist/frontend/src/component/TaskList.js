import React from "react";

const TaskList = ({ tasks, onUpdate, onDelete }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task._id}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate(task._id, { completed: !task.completed })}
        />
        {task.title}
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TaskList;
