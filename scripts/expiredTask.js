import { query } from "./queryDocuments.js";
import { addHandlers } from "./updateTasks.js";
import { formatDate } from "./date.js";
let tasks = await query("tasks");

$(document).ready(() => {
  checkExpiredTasks();
});

export function checkExpiredTasks() {
  let counter = 0;
  document.getElementById("expiredTasks").innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const zeroPad = (num, places) => String(num).padStart(places, "0");

    let title = tasks[i].title;
    let id = tasks[i].id;
    let desc = tasks[i].description;

    let endTime = tasks[i].endTime;

    let endDate = formatDate(tasks[i].endDate.toDate());

    let todayDate = formatDate(new Date());

    let timeNow = new Date();
    timeNow = timeNow.getHours() + ":" + zeroPad(timeNow.getMinutes(), 2);

    if (
      (todayDate > endDate || (todayDate == endDate && endTime < timeNow)) &&
      sessionStorage.getItem("notifications") == "on"
    ) {
      counter++;
      document.getElementById("expiredTasks").innerHTML += `
        <div class="border border-secondary bg-blush rounded-3 text-center text-wrap p-3 task-card" id="task-goes-here" style="height: 100%; display: flex;justify-content: space-between;">
          <div style="width:50% align-self: start" id=${tasks[i].id}>
            <h3>${title}</h3>
            <p>${desc}</p>
            <p>Task expired on ${endDate} at ${endTime}</p>
          </div>
          <div class="task-card" style="align-self: end; display: flex; flex-direction: column">
            <button class="edit" onclick="$('#expiredModal').modal('hide'); updateTask('${id}')">Edit Date</button>
            <button class="complete" onclick="complete('${id}')">Delete</button>
          </div>
        </div>
      `;
    }
  }
  if (counter > 0) {
    $("#expiredModal").modal("show");
  }
}
window.checkExpiredTasks = checkExpiredTasks;

addHandlers();
