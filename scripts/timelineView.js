import { query } from './queryTasks.js';
import {addHandlers} from './updateTasks.js';
let tasks = await query();
console.log(tasks);

for (let i = 0; i < tasks.length; i++) {
  let title = tasks[i].title
  let desc = tasks[i].description
  let end = tasks[i].endTime
  let start = tasks[i].startTime

  let startArray = start.split(":")
  let startHour = startArray[0]
  let startMinute = startArray[1]
  let endArray = end.split(":")
  let endHour = endArray[0]
  let endMinute = endArray[1]


  startMinute = minuteRound(startMinute)
  endMinute = minuteRound(endMinute)
  let rowspan = (endHour * 2) + (endMinute) - (startHour * 2) + (startMinute)
  let startID = (startHour * 2) + (startMinute)
  console.log(rowspan)

  let height = 100 + ((rowspan - 2) * 35)

  document.getElementById(startID).innerHTML +=
    `
      <td rowspan = "${rowspan}">
        <div id="task-goes-here" style="height: 100%">
          <div style="height: ${height}px; display: flex;justify-content: center;align-items: center; flex-direction: column;" class="border border-secondary bg-blush rounded-3 text-center text-wrap p-3 task-card" id=${tasks[i].id}>
          <h3>${title}</h3>
          <button class="edit" style="display:none;">Edit</button>
          <p>${desc}</p>
          </div>
        </div>
      </td>
    `
}

function minuteRound(minute) {
  if (minute >= 0 && minute < 15) {
    return 0
  }
  else if (minute >= 15 && minute < 45) {
    return 1
  }
  else {
    return 2
  }
}

addHandlers()
