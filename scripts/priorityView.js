import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';

async function priorityTasks(selectedDate) {
    let tasks = await query();

    tasks.forEach(task => {
        if (task.startDate === selectedDate) {
            displayTask(task);
        }
    });

    // Add event handlers after displaying tasks
    addHandlers();
}

function displayTask(task) {
    let taskContainer;
    switch (task.importance) {
        case 'high':
            taskContainer = document.getElementById('high-tasks');
            break;
        case 'medium':
            taskContainer = document.getElementById('medium-tasks');
            break;
        case 'low':
            taskContainer = document.getElementById('low-tasks');
            break;
    }

    let taskCard = `
        <div class="bg-${task.importance} task-card" id="${task.id}" style="display:flex; flex-direction:column; margin: 5px 15px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p class="title" style="font-weight:bold">${task.title}</p>
                </div>
                <div style="display:flex; flex-direction:column;">
                    <button class="edit" style="display:none;">Edit</button> 
                    <div style="display:flex;">
                        <p class="start-time">${task.startTime}</p>
                        <p class="end-time">-${task.endTime}</p>
                    </div>
                    <button class="complete" onclick="complete('${task.id}')">Complete</button>
                </div>
            </div>
            <div>
                <p class="description">${task.description}</p>
            </div> 
        </div>
    `;

    taskContainer.innerHTML += taskCard;
}

// Change today's date
function setDefaultDate() {
    var today = new Date().toISOString().slice(0, 10);
    document.getElementById('selectedDate').value = today;
    updateDate(today); // Update displayed date
}

// Function to update the displayed date
function updateDate(selectedDate) {
    document.getElementById('displayDate').textContent = selectedDate;
}

// Set today's date as the default value
setDefaultDate();

// Add event listener to update displayed date and tasks when date input changes
document.getElementById('selectedDate').addEventListener('input', function () {
    var selectedDate = this.value;
    updateDate(selectedDate);
    priorityTasks(selectedDate);
});

// Initial display of tasks based on today's date
priorityTasks(new Date().toISOString().slice(0, 10));
