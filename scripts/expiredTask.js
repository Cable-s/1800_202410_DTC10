import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';
let tasks = await query();
console.log(tasks);

$(document).ready(() => {
  checkExpiredTasks()
})


function checkExpiredTasks() {
  let counter = 0
  document.getElementById("expiredTasks").innerHTML = ""
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title
    let id = tasks[i].id
    let desc = tasks[i].description
    let end = tasks[i].endTime

    let endTimestamp = tasks[i].endDate
    let endDate = new Date(endTimestamp.seconds * 1000)
    let endTime = tasks[i].endTime
    let d = new Date()
    let time = d.getTime()
    let todayDate = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
    let endDates = endDate.toDateString()
    if ((todayDate > endTimestamp || todayDate == endTimestamp && time > endTime)) {
      counter++
      document.getElementById("expiredTasks").innerHTML +=
        `
        <div class="border border-secondary bg-blush rounded-3 text-center text-wrap p-3 task-card" id="task-goes-here" style="height: 100%; display: flex;justify-content: space-between;">
          <div style="width:50% align-self: start" id=${tasks[i].id}>
            <h3>${title}</h3>
            <p>${desc}</p>
            <p>Task expired on ${endDates} at ${end}</p>
          </div>
          <div class="task-card" style="align-self: end; display: flex; flex-direction: column">
            <button class="edit" onclick="$('#expiredModal').modal('hide'); updateTask('${id}')">Edit Date</button>
            <button class="complete" onclick="complete('${id}')">Delete</button>
          </div>
        </div>
      `
    }
  }
  if (counter > 0) {
    $('#expiredModal').modal('show')
  }
}
window.checkExpiredTasks = checkExpiredTasks

addHandlers()
