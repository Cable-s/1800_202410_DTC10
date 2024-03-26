import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';
let tasks = await query();

$(document).ready(() => {
  checkExpiredTasks()
})


function checkExpiredTasks() {
  let counter = 0
  document.getElementById("expiredTasks").innerHTML = ""
  for (let i = 0; i < tasks.length; i++) {
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    let title = tasks[i].title
    let id = tasks[i].id
    let desc = tasks[i].description

    let endTime = tasks[i].endTime

    let endDate = new Date(tasks[i].endDate.seconds * 1000)
    endDate = endDate.getFullYear() + "-" + zeroPad((endDate.getMonth() + 1), 2) + "-" + endDate.getDate()


    let todayDate = new Date()
    todayDate = todayDate.getFullYear() + "-" + zeroPad((todayDate.getMonth() + 1), 2) + "-" + todayDate.getDate()

    let timeNow = new Date()
    timeNow = timeNow.getHours() + ":" + zeroPad(timeNow.getMinutes(), 2)


    console.log("timeNow " + timeNow)
    console.log("endTime " + endTime)
    console.log(endTime < timeNow)
    console.log("endDate " + endDate)
    console.log("todayDate " + todayDate)
    console.log(todayDate > endDate)
    console.log(todayDate == endDate)

    if ((todayDate > endDate || todayDate == endDate && endTime < timeNow)) {
      counter++
      document.getElementById("expiredTasks").innerHTML +=
        `
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
      `
    }
  }
  if (counter > 0) {
    $('#expiredModal').modal('show')
  }
}
window.checkExpiredTasks = checkExpiredTasks

addHandlers()
