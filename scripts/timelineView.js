import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';

async function displayTasksByDate(selectedDate) {
  let tasks = await query();
  //console.log(tasks);
  for (let i = 0; i < tasks.length; i++) {
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    let taskStartDate = new Date(tasks[i].startDate.seconds * 1000)
    let taskEndDate = new Date(tasks[i].endDate.seconds * 1000)

    taskStartDate = taskStartDate.getFullYear() + "-" + zeroPad((taskStartDate.getMonth() + 1), 2) + "-" + taskStartDate.getDate()
    taskEndDate = taskEndDate.getFullYear() + "-" + zeroPad((taskEndDate.getMonth() + 1), 2) + "-" + taskEndDate.getDate()



    // Check if the selected date falls within the range of task's start and end dates
    if (selectedDate >= taskStartDate && selectedDate <= taskEndDate) {
      if (taskStartDate == taskEndDate) {
        console.log("same day")
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
        console.log("on overflow " + rowspan, startID)
        let height = rowspan * 35;
        document.getElementById(startID).innerHTML +=
          `
          <td rowspan = "${rowspan}">
            <div id="task-goes-here" style="height: ${height}px">
              <div style="height: 100%; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary bg-blush rounded-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
                <h3>${title}</h3>
                <button class="edit" style="display:none;">Edit</button>
                <p>${desc}</p>
                <button class="complete" onclick="complete('${id}')">Complete</button>
              </div>
            </div>
          </td>
        `;
      }
      else if (taskStartDate == selectedDate) {
        console.log("start day")
        let title = tasks[i].title;
        let id = tasks[i].id;
        let desc = tasks[i].description;
        let end = "24:00";
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
        console.log("end overflow" + rowspan, startID)
        let height = rowspan * 35;
        document.getElementById(startID).innerHTML +=
          `
          <td rowspan = "${rowspan}">
          <div id="task-goes-here" style="height: ${height}px">
          <div style="height: 100%; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary border-bottom-0 bg-blush rounded-top-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
                <h3>${title}</h3>
                <button class="edit" style="display:none;">Edit</button>
                <p>${desc}</p>
                <button class="complete" onclick="complete('${id}')">Complete</button>
              </div>
            </div>
          </td>
        `;
      }
      else if (taskEndDate == selectedDate) {
        console.log("end day")
        let title = tasks[i].title;
        let id = tasks[i].id;
        let desc = tasks[i].description;
        let end = tasks[i].endTime;
        let start = "00:00";

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
        console.log("start overflow" + rowspan, startID)

        let height = rowspan * 35;
        document.getElementById(startID).innerHTML +=
          `
          <td rowspan = "${rowspan}">
          <div id="task-goes-here" style="height: ${height}px">
          <div style="height: 100%; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary border-top-0 bg-blush rounded-bottom-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
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

function clearTasks() {
  console.log("clearing")
  for (let i = 0; i < 48; i++) {
    let times = ["am 00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "11:59"]
    document.getElementById(i).innerHTML = ""
    document.getElementById(i).innerHTML = `
    <tr id="${i}">
    <td class="time" style="width:19%">${times[i]}</td>
    </tr>
    `

  }
}

// Change today's date
function setDefaultDate() {
  var today = new Date().toLocaleDateString()
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
document.getElementById('selectedDate').addEventListener('input', function () {
  clearTasks()
  displayTasksByDate(this.value);
});
