import { query } from "./queryDocuments.js";
import { addHandlers } from "./updateTasks.js";
import { formatDate } from "./date.js";

let tasks = await query("tasks");

function getCategoryLabels(selectedDate) {
  let categoryLabels = [];
  for (let i = 0; i < tasks.length; i++) {
    let startDate = formatDate(tasks[i].startDate.toDate());
    let endDate = formatDate(tasks[i].endDate.toDate());
    if (startDate <= selectedDate && selectedDate <= endDate) {
      let category = tasks[i].category;
      categoryLabels.push(category);
    }
  }
  categoryLabels.sort();
  let categories = [...new Set(categoryLabels)];
  return categories;
}

async function displayCategorized(selectedDate) {
  let categories = getCategoryLabels(selectedDate);
  for (let i = 0; i < categories.length; i++) {
    document.getElementById("categorized").innerHTML +=
      `
            <h1> ` +
      categories[i] +
      ` </h1>
            `;
    for (let j = 0; j < tasks.length; j++) {
      let startDate = formatDate(tasks[j].startDate.toDate());
      let endDate = formatDate(tasks[j].endDate.toDate());
      if (startDate <= selectedDate && selectedDate <= endDate) {
        if (categories[i] == tasks[j].category) {
          document.getElementById("categorized").innerHTML +=
            `<div style="border-style:dotted; display: flex; flex-direction: row; justify-content: space-between;" class="task-card" id='${tasks[j].id}'>
            <div style="display: flex; flex-direction: column;">
                        <p> ` +
            tasks[j].title +
            ` </p>
                        <p> ` +
            tasks[j].description +
            `</p>
          </div>
          <div style="display: flex; flex-direction: column;">
          <div style="display: flex; flex-direction: row;">
            <button class ="edit" ><img src="./images/edit-icon.png" style="width:25px"></button>
            <button class="complete"><img src="./images/check-icon.png" style="width:25px"></button>
          </div>
          </div>

                        </div>   
                        `;
        }
      }
    }
  }
  addHandlers();
}

// Change today's date
function setDefaultDate() {
  let today = formatDate(new Date());
  document.getElementById("selectedDate").value = today;
  getCategoryLabels(today);
  displayCategorized(today);
}

// Set today's date as the default value
setDefaultDate();

// Add event listener to update displayed date when date input changes
document.getElementById("selectedDate").addEventListener("input", function () {
  clearTasks();
  getCategoryLabels(this.value);
  displayCategorized(this.value);
});

function clearTasks() {
  document.getElementById("categorized").innerHTML = "";
}
