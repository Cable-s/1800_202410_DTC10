import { query } from "./queryDocuments.js";
import { submitForm, displayCharactersLeft } from "./addTask.js";
var userID = sessionStorage.getItem("userId");
let tasks = await query("tasks");

function sendUpdate(valuesArray, id) {
  if (userID) {
    // User is signed in.
    db.collection("users")
      .doc(userID)
      .collection("tasks")
      .doc(id)
      .update({
        title: valuesArray.title,
        description: valuesArray.description,
        category: valuesArray.category,
        startDate: new Date(valuesArray.startDate),
        endDate: new Date(valuesArray.endDate),
        startTime: valuesArray.startTime,
        endTime: valuesArray.endTime,
        importance: valuesArray.importance,
      })
      .then(() => {
        location.reload();
      });
  }
}

function updateTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (id === tasks[i].id) {
      let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      //let modal = bootstrap.Modal.getOrCreateInstance("#exampleModal");
      if (modal) {
        modal.show();
      }
      let label = document.querySelector("#exampleModalLabel");
      let form = document.getElementById("input-form");
      let titleInput = document.getElementById("title-input");
      let descriptionInput = document.getElementById("description-input");
      let category = document.getElementById("category-input");
      let startDate = document.getElementById("startDate");
      let endDate = document.getElementById("endDate");
      let startTime = document.getElementById("startTime");
      let endTime = document.getElementById("endTime");
      let importance = document.getElementById("importanceSelect");

      let submitButton = document.getElementById("addTaskBtn");
      let closeButton = document.getElementById("closeModal");

      closeButton.addEventListener("click", () => {
        let form = document.getElementById("input-form");
        let modal = bootstrap.Modal.getOrCreateInstance("#exampleModal");
        modal.hide();
        form.reset();
        label.innerText = "Task Creation";
        category.value = "Un-categorized";
        descriptionInput.innerText = "";
        submitButton.innerText = "Add Task";
        displayCharactersLeft();
        checkExpiredTasks();
      });
      label.innerText = "Edit Task";
      submitButton.innerText = "Update Task";

      titleInput.value = tasks[i].title;
      descriptionInput.removeAttribute("placeholder");
      descriptionInput.innerText = tasks[i].description;

      category.value = `${tasks[i].category}`;
      startDate.value = tasks[i].startDate.toDate().toISOString().slice(0, 10);

      endDate.value = tasks[i].startDate.toDate().toISOString().slice(0, 10);

      startTime.value = tasks[i].startTime;
      endTime.value = tasks[i].endTime;

      // set importance dropdown to the correct value
      for (var j, k = 0; (j = importance.options[k]); k++) {
        if (j.value == tasks[i].importance) {
          importance.selectedIndex = k;
          break;
        }
      }
      //Remove the addTask submitForm element so we don't create double our task
      submitButton.removeEventListener("click", submitForm);
      submitButton.addEventListener("click", function () {
        let adjustedValues = {
          title: titleInput.value,
          description: descriptionInput.value,
          category: category.value,
          startDate: startDate.value + "T00:00:00",
          endDate: endDate.value + "T00:00:00",
          startTime: startTime.value,
          endTime: endTime.value,
          importance: importance.value,
        };
        sendUpdate(adjustedValues, id);
      });
    }
  }
}

function complete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      db.collection("users")
        .doc(userID)
        .collection("tasks")
        .doc(id)
        .delete()
        .then(() => {
          location.reload();
        });
    }
  }
}

export function addHandlers() {
  const taskCards = document.getElementsByClassName("task-card");
  for (let i = 0; i < taskCards.length; i++) {
    let editButton = taskCards[i].querySelector(".edit");
    let completeButton = taskCards[i].querySelector(".complete");
    let id = taskCards[i].id;
    editButton.addEventListener("click", () => {
      updateTask(id);
    });
    completeButton.addEventListener("click", () => {
      complete(id);
    });
  }
}

window.complete = complete;
window.updateTask = updateTask;
