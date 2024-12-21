// Select input and task list elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add a task when pressing Enter
taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter' && taskInput.value.trim() !== '') {
    addTask(taskInput.value.trim());
    taskInput.value = ''; // Clear input
  }
});

// Function to add a task
function addTask(taskText) {
  const li = document.createElement('li');

  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="toggle">Done</button>
      <button class="delete">Delete</button>
    </div>
  `;

  // Append task to the list
  taskList.appendChild(li);

  // Add event listeners for buttons
  li.querySelector('.toggle').addEventListener('click', function () {
    li.classList.toggle('done');
  });

  li.querySelector('.delete').addEventListener('click', function () {
    taskList.removeChild(li);
  });
}
