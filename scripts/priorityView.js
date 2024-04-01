import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';

async function priorityTasks(selectedDate) {
  console.log(selectedDate)
  let tasks = await query();

  tasks.forEach(task => {
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    let taskStartDate = new Date(task.startDate.seconds * 1000)
    taskStartDate = taskStartDate.getFullYear() + "-" + zeroPad((taskStartDate.getMonth() + 1), 2) + "-" + zeroPad(taskStartDate.getDate(), 2)

    console.log(taskStartDate)
    console.log(taskStartDate == selectedDate)
    if (taskStartDate === selectedDate) {
      displayTask(task);
    }
  });

  // Add event handlers after displaying tasks
  addHandlers();
}

function displayTask(task) {
  let taskContainer;
  switch (task.importance) {
    case 'high':
      taskContainer = document.getElementById('high-tasks');
      break;
    case 'medium':
      taskContainer = document.getElementById('medium-tasks');
      break;
    case 'low':
      taskContainer = document.getElementById('low-tasks');
      break;
  }

  let taskCard = 
    `
    <div class="bg-${task.importance} task-card border border-secondary rounded-3" id="${task.id}" 
    style="display:flex; flex-direction:column; margin: 5px; padding: 10px;">
      <div style="display:flex; place-content:space-between"> 
        <div>   
          <p class="title" style="font-weight:bold">${task.title}</p>
          <p class="description">${task.description}</p>
        </div>
        <div style="display:flex; flex-direction:column;">
          <div style="display:flex;">
            <p class="start-time">${task.startTime}</p>
            <p class="end-time">-${task.endTime}</p>
          </div>
          <button class ="edit" style="display:none"><img src="./images/edit-icon.png" style="width:25px"></button>
          <button class="complete" style ="display:none"><img src="./images/check-icon.png" style="width:25px"></button>   
        </div>
      </div>
    <div>
  `;

  taskContainer.innerHTML += taskCard;
}

// Change today's date
function setDefaultDate() {
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  let today = new Date()
  today = today.getFullYear() + "-" + zeroPad((today.getMonth() + 1), 2) + "-" + zeroPad(today.getDate(), 2)
  document.getElementById('selectedDate').value = today;
  priorityTasks(today);
}

// Set today's date as the default value
setDefaultDate();

// Add event listener to update displayed date when date input changes
document.getElementById('selectedDate').addEventListener('input', function () {
  clearTasks()
  priorityTasks(this.value);
});

// Initial display of tasks based on today's date
function clearTasks() {
  console.log("clear")
  document.getElementById('high-tasks').innerHTML = ""
  document.getElementById('medium-tasks').innerHTML = ""
  document.getElementById('low-tasks').innerHTML = ""
}