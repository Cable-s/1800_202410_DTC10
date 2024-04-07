import { query } from "./queryDocuments.js";
import { addHandlers } from "./updateTasks.js";
import { formatDate } from "./date.js";

async function priorityTasks(selectedDate) {
  let tasks = await query("tasks");
  tasks.forEach((task) => {
    let taskStartDate = formatDate(task.startDate.toDate());
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
    case "high":
      taskContainer = document.getElementById("high-tasks");
      break;
    case "medium":
      taskContainer = document.getElementById("medium-tasks");
      break;
    case "low":
      taskContainer = document.getElementById("low-tasks");
      break;
  }

  let taskCard = `
    <div class="bg-${task.importance} task-card" id="${task.id}" 
    style="border-style:outset; border-radius:10px; background-color:white; display:flex; flex-direction:column; margin: 5px; padding: 10px;">
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
          <div style="display: flex">
            <button class ="edit" ><img src="./images/edit-icon.png" style="width:25px"></button>
            <button class="complete"><img src="./images/check-icon.png" style="width:25px"></button>   
          </div>
        </div>
      </div>
    <div>
  `;

  taskContainer.innerHTML += taskCard;
}
// Change today's date
function setDefaultDate() {
  let today = formatDate(new Date());
  document.getElementById("selectedDate").value = today;
  priorityTasks(today);
}

// Set today's date as the default value
setDefaultDate();

// Add event listener to update displayed date when date input changes
document.getElementById("selectedDate").addEventListener("input", function () {
  clearTasks();
  priorityTasks(this.value);
});

// Initial display of tasks based on today's date
function clearTasks() {
  document.getElementById("high-tasks").innerHTML = "";
  document.getElementById("medium-tasks").innerHTML = "";
  document.getElementById("low-tasks").innerHTML = "";
}
