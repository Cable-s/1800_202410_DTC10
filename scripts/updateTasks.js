import { query} from './queryTasks.js';

let tasks = await query();
export function updateTask(){
    console.log(tasks);
    for (let i = 0; i < tasks.length; i++){
        console.log(tasks[0].id)
    }
}
function showButton(element, state) {
    if (state === "show"){
        element.style.display = "flex";
    }
    else {
        element.style.display = "none";
    }
};
export function addHandlers() {
    const taskCards = document.getElementsByClassName('task-card');    
    for (let i = 0; i < taskCards.length; i++) {
        let editButton = taskCards[i].querySelector(".edit");
        taskCards[i].addEventListener("mouseover", () => {
            showButton(editButton, "show");
        });
        taskCards[i].addEventListener("mouseout", () => {
            showButton(editButton, "hide");
        });
        editButton.addEventListener("click", () => {
            updateTask()
        });
    };
}

