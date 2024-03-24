import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';

async function displayTasksByDate(selectedDate) {
  let tasks = await query();
  console.log(tasks);

  for (let i = 0; i < tasks.length; i++) {
    let taskStartDate = new Date(tasks[i].startDate);
    let taskEndDate = new Date(tasks[i].endDate);

    // Check if the selected date falls within the range of task's start and end dates
    if (selectedDate >= taskStartDate && selectedDate <= taskEndDate) {
      let title = tasks[i].title;
      let id = tasks[i].id;
      let desc = tasks[i].description;
      let end = tasks[i].endTime;
      let start = tasks[i].startTime;

      let startArray = start.split(":");
      let startHour = parseInt(startArray[0]);
      let startMinute = parseInt(startArray[1]);
      let endArray = end.split(":");
      let endHour = parseInt(endArray[0]);
      let endMinute = parseInt(endArray[1]);

      startMinute = minuteRound(startMinute);
      endMinute = minuteRound(endMinute);
      let rowspan = (endHour * 2) + (endMinute) - (startHour * 2) + (startMinute);
      let startID = (startHour * 2) + (startMinute);

      let height = 100 + ((rowspan - 2) * 35);

      document.getElementById(startID).innerHTML +=
        `
          <td rowspan = "${rowspan}">
            <div id="task-goes-here" style="height: 100%">
              <div style="height: ${height}px; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary bg-blush rounded-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
                <h3>${title}</h3>
                <button class="edit" style="display:none;">Edit</button>
                <p>${desc}</p>
                <button class="complete" onclick="complete('${id}')">Complete</button>
              </div>
            </div>
          </td>
        `;
    }
  }

  // After adding tasks, add event handlers
  addHandlers();
}

function minuteRound(minute) {
  if (minute >= 0 && minute < 15) {
    return 0;
  } else if (minute >= 15 && minute < 45) {
    return 1;
  } else {
    return 2;
  }
}

// Change today's date
function setDefaultDate() {
  var today = new Date().toISOString().slice(0, 10);
  document.getElementById('selectedDate').value = today;
  updateDate(today); // Update displayed date
}

// Function to update the displayed date
function updateDate(selectedDate) {
  document.getElementById('displayDate').textContent = selectedDate;
}

// Set today's date as the default value
setDefaultDate();

// Add event listener to update displayed date when date input changes
document.getElementById('selectedDate').addEventListener('input', function() {
  var selectedDate = new Date(this.value);
  updateDate(selectedDate.toISOString().slice(0, 10));
  displayTasksByDate(selectedDate);
});
