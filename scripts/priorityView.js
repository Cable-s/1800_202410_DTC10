import { query } from './queryTasks.js';
import { addHandlers } from './updateTasks.js';
let tasks = await query();


function priorityTasks() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].importance === 'high') {
            document.getElementById('high-tasks').innerHTML +=
                ` 
        <div class = "bg-high task-card" id=${tasks[i].id} style="display:flex; flex-direction:column; margin: 5px 15px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p class="title" style="font-weight:bold">`+ tasks[i].title + `
                </div>
                <div style="display:flex; flex-direction:column;">
                    <button class="edit" style="display:none;">Edit</button> 
                    <div style="display:flex;">
                        <p class="start-time">`+ tasks[i].startTime + `
                        <p class="end-time">-`+ tasks[i].endTime + `
                    </div>
                    <button class="complete" onclick="complete('`+ tasks[i].id + `')">Complete</button>
                </div>
            </div>
            <div>
                <p class="description">`+ tasks[i].description + `</p>
            </div> 
        </div >
        `;
        }
        if (tasks[i].importance === 'medium') {
            document.getElementById('medium-tasks').innerHTML +=
                `
        <div class = "bg-medium task-card" id=${tasks[i].id} style="display:flex; flex-direction:column; margin: 5px 15px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p class="title" style="font-weight:bold">`+ tasks[i].title + `
                </div>
                <div style="display:flex; flex-direction:column;">
                    <button class="edit" style="display:none;">Edit</button> 
                    <div style="display:flex;">
                        <p class="start-time">`+ tasks[i].startTime + `
                        <p class="end-time">-`+ tasks[i].endTime + `
                    </div>
                    <button class="complete" onclick="complete('`+ tasks[i].id + `')">Complete</button>
                </div>
            </div>
            <div>
                <p class="description">`+ tasks[i].description + `</p>
            </div> 
        </div >
        `;
        }
        if (tasks[i].importance === 'low') {
            document.getElementById('low-tasks').innerHTML +=
                `
        <div class = "bg-low task-card" id=${tasks[i].id} style="display:flex; flex-direction:column; margin: 5px 15px; margin-bottom: 100px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p class="title" style="font-weight:bold">`+ tasks[i].title + `
                </div>
                <div style="display:flex; flex-direction:column;">
                    <button class="edit" style="display:none;">Edit</button> 
                    <div style="display:flex;">
                        <p class="start-time">`+ tasks[i].startTime + `
                        <p class="end-time">-`+ tasks[i].endTime + `
                    </div>
                    <button class="complete" onclick="complete('`+ tasks[i].id + `')">Complete</button>
            </div>
            <div>
                <p class="description">`+ tasks[i].description + `</p>
            </div> 
        </div >
        `;
        }

    }
}

priorityTasks()
addHandlers()
