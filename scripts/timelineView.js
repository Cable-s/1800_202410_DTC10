import { query } from "./queryDocuments.js";
import { addHandlers } from "./updateTasks.js";
import { formatDate } from "./date.js";

async function displayTasksByDate(selectedDate) {
  let tasks = await query("tasks");

  for (let i = 0; i < tasks.length; i++) {
    let taskStartDate = formatDate(tasks[i].startDate.toDate());
    let taskEndDate = formatDate(tasks[i].endDate.toDate());

    // Check if the selected date falls within the range of task's start and end dates
    if (selectedDate >= taskStartDate && selectedDate <= taskEndDate) {
      if (taskStartDate == taskEndDate) {
        let title = tasks[i].title;
        let id = tasks[i].id;
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
        let rowspan = endHour * 2 + endMinute - startHour * 2 + startMinute;
        let startID = startHour * 2 + startMinute;

        let height = rowspan * 35;

        document.getElementById(startID).innerHTML += `
          <td rowspan = "${rowspan}">
            <div id="task-goes-here" style="height: ${height}px">
              <div style="height: ${height}px; display: flex; flex-direction: column;" 
              class="border border-secondary rounded-3 text-wrap task-card" id=${tasks[i].id}><div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div style="display: flex; flex-direction: column;" class="p-1">
                <h3>${title}</h3>
                </div>
                <div style="display: flex; flex-direction: column;">
                <div style="display: flex; flex-direction: row;">
                <button class ="edit"><img src="./images/edit-icon.png" style="width:25px"></button>
                <button class="complete"><img src="./images/check-icon.png" style="width:25px"></button>   
                </div>
              </div>
            </div>
          </div>
          </td>
          `;
      } else if (taskStartDate == selectedDate) {
        let title = tasks[i].title;
        let id = tasks[i].id;
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
        let rowspan = endHour * 2 + endMinute - startHour * 2 + startMinute;
        let startID = startHour * 2 + startMinute;
        let height = rowspan * 35;
        document.getElementById(startID).innerHTML += `
          <td rowspan = "${rowspan}">
            <div id="task-goes-here" style="height: ${height}px">
              <div style="height: 100%; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary border-bottom-0 rounded-top-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
                <h3>${title}</h3>
                <button class ="edit" style="display:none"><img src="./images/edit-icon.png" style="width:25px"></button>
                <button class="complete" style ="display:none"><img src="./images/check-icon.png" style="width:25px"></button>   
              </div>
            </div>
          </td>
          `;
      } else if (taskEndDate == selectedDate) {
        let title = tasks[i].title;
        let id = tasks[i].id;
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
        let rowspan = endHour * 2 + endMinute - startHour * 2 + startMinute;
        let startID = startHour * 2 + startMinute;

        let height = rowspan * 35;
        document.getElementById(startID).innerHTML += `
          <td rowspan = "${rowspan}">
            <div id="task-goes-here" style="height: ${height}px">
              <div style="height: 100%; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary border-top-0 rounded-bottom-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
                <h3>${title}</h3>
                <button class ="edit" style="display:none"><img src="./images/edit-icon.png" style="width:25px"></button>
                <button class="complete" style ="display:none"><img src="./images/check-icon.png" style="width:25px"></button>   
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
  for (let i = 0; i < 48; i++) {
    let times = [
      "am 00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "11:59",
    ];
    document.getElementById(i).innerHTML = "";
    document.getElementById(i).innerHTML = `
    <tr id="${i}">
    <td class="time" style="width:19%">${times[i]}</td>
    </tr>
    `;
  }
}

// Change today's date
function setDefaultDate() {
  //const zeroPad = (num, places) => String(num).padStart(places, "0");
  let today = formatDate(new Date());
  document.getElementById("selectedDate").value = today;
  displayTasksByDate(today);
}

// Set today's date as the default value
setDefaultDate();

// Add event listener to update displayed date when date input changes
document.getElementById("selectedDate").addEventListener("input", function () {
  clearTasks();
  displayTasksByDate(this.value);
});
