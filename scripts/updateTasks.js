import { query } from './queryTasks.js';

let tasks = await query();
function sendUpdate(id, valuesArray) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let userID = user.uid;
            // User is signed in.
            db.collection("users").doc(userID).collection("tasks").doc(id).update({
                title: valuesArray.title,
                description: valuesArray.description,
                category: valuesArray.category,
                startDate: valuesArray.startDate,
                endDate: valuesArray.endDate,
                startTime: valuesArray.startTime,
                endTime: valuesArray.endTime,
                importance: valuesArray.importance,
                repeat: valuesArray.repeat
            }).then(() => { location.reload() })
        }
    })
}

function updateTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (id === tasks[i].id) {
            let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
            modal.show();

            let label = document.getElementById("exampleModalLabel");
            let form = document.getElementById("input-form");
            let titleInput = document.getElementById("title-input");
            let descriptionInput = document.getElementById("description-input");
            let category = document.getElementById("category-input");
            let startDate = document.getElementById("startDate");
            let endDate = document.getElementById("endDate");
            let startTime = document.getElementById("startTime");
            let endTime = document.getElementById("endTime");
            let importance = document.getElementById("importanceSelect");

            let repeatSelect = document.getElementById("repeatSelect");
            let submitButton = document.getElementById("addTaskBtn");
            let closeButton = document.getElementById("closeModal");

            closeButton.addEventListener("click", () => { checkExpiredTasks() })
            label.innerText = "Edit Task";
            submitButton.innerText = "Update Task";
            form.reset();

            titleInput.setAttribute("value", tasks[i].title);
            descriptionInput.removeAttribute("placeholder");
            descriptionInput.innerText = tasks[i].description;

            category.setAttribute("value", tasks[i].category);

            startDate.setAttribute("value", tasks[i].startDate);
            endDate.setAttribute("value", tasks[i].endDate);
            startTime.setAttribute("value", tasks[i].startTime);
            endTime.setAttribute("value", tasks[i].endTime);

            // set importance dropdown to the correct value
            for (var j, k = 0; j = importance.options[k]; k++) {
                if (j.value == tasks[i].importance) {
                    importance.selectedIndex = k;
                    break;
                }
            }

            // set repeat dropdown to the correct value
            if (tasks[i].repeat !== "noRepeat") {

                for (var j, k = 0; j = repeatSelect.options[k]; k++) {
                    if (j.value == tasks[i].repeat) {
                        repeatSelect.selectedIndex = k;
                        break;
                    }
                }
            }
            submitButton.onclick = function () {
                let adjustedValues = {
                    "title": titleInput.value,
                    "description": descriptionInput.value,
                    "category": category.value,
                    "startDate": startDate.value,
                    "endDate": endDate.value,
                    "startTime": startTime.value,
                    "endTime": endTime.value,
                    "importance": importance.value,
                    "repeat": repeatSelect.value
                }

                sendUpdate(tasks[i].id, adjustedValues)
            }

        }
    }
}
function showButton(element, state) {
    state === "show" ? element.style.display = "flex" : element.style.display = "none";
};

export function addHandlers() {
    const taskCards = document.getElementsByClassName('task-card');
    for (let i = 0; i < taskCards.length; i++) {
        let editButton = taskCards[i].querySelector(".edit");
        let id = taskCards[i].id
        taskCards[i].addEventListener("mouseover", () => {
            showButton(editButton, "show");
        });
        taskCards[i].addEventListener("mouseout", () => {
            showButton(editButton, "hide");
        });
        editButton.addEventListener("click", () => {
            updateTask(id);
        });
    };
}
window.updateTask = updateTask
