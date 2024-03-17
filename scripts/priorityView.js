import { query } from './queryTasks.js';
let tasks = await query();
console.log(tasks);

console.log(tasks.length);

function priorityTasks () {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].importance === 'high'){
            document.getElementById('high-tasks').innerHTML +=
            `
        <div class = "bg-high" style="display:flex; flex-direction:column; margin: 5px 15px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p style="font-weight:bold">`+tasks[i].title+`
                </div>
                <div style="display:flex">
                    <p>`+tasks[i].startTime+`
                    <p>-`+tasks[i].endTime+`
                </div>
            </div>
            <div>
                <p>`+tasks[i].description+`
            </div> 
        </div >
        `;
        }
        if (tasks[i].importance === 'medium'){
            document.getElementById('medium-tasks').innerHTML +=
            `
        <div class = "bg-medium" style="display:flex; flex-direction:column; margin: 5px 15px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p style="font-weight:bold">`+tasks[i].title+`
                </div>
                <div style="display:flex">
                    <p>`+tasks[i].startTime+`
                    <p>-`+tasks[i].endTime+`
                </div>
            </div>
            <div>
                <p>`+tasks[i].description+`
            </div> 
        </div >
        `;
        }
        if (tasks[i].importance === 'low'){
            document.getElementById('low-tasks').innerHTML +=
            `
        <div class = "bg-low" style="display:flex; flex-direction:column; margin: 5px 15px; margin-bottom: 100px; padding: 10px;">
            <div style="display:flex; place-content:space-between"> 
                <div>   
                    <p style="font-weight:bold">`+tasks[i].title+`
                </div>
                <div style="display:flex">
                    <p>`+tasks[i].startTime+`
                    <p>-`+tasks[i].endTime+`
                </div>
            </div>
            <div>
                <p>`+tasks[i].description+`
            </div> 
        </div >
        `;
        }

}
}

priorityTasks()

