import { query } from './queryTasks.js';
let tasks = await query();
console.log(tasks);


function getCategoryLabels() {

    let categoryLabels = [];
    for (let i = 0; i < tasks.length; i++) {
        let startDate = tasks[i].startDate
        let endDate = tasks[i].endDate
        let d = new Date()
        let todayDate = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
        console.log(i, startDate <= todayDate && todayDate <= endDate)
        if ((startDate <= todayDate && todayDate <= endDate)) {
            let category = tasks[i].category;
            categoryLabels.push(category);
        }
    }
    categoryLabels.sort();
    let categories = [...new Set(categoryLabels)];
    //categories.shift();  // didn't know the purpose of this. It was deleting the first element which was a category
    categories.unshift('Un-categorized');
    return categories
}

// function uncategorizedLabel() {
//     console.log(tasks)
// }

function displayCategorized() {
    let categories = getCategoryLabels();
    //console.log(categories)
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('categorized').innerHTML +=
            `
            <h1> `+ categories[i] + ` </h1>
            `
        for (let j = 0; j < tasks.length; j++) {
            let startDate = tasks[j].startDate
            let endDate = tasks[j].endDate
            let d = new Date()
            let todayDate = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
            if ((startDate <= todayDate && todayDate <= endDate)) {
                if (categories[i] == tasks[j].category) {
                    document.getElementById('categorized').innerHTML +=
                        `<div style="border-style:dotted">
                        <p> `+ tasks[j].title + ` </p>
                        <p> `+ tasks[j].description + `</p>
                        </div>   
                        `
                }
            }
        }
    }
}

// Change today's date
function setDefaultDate() {
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    let today = new Date()
    today = today.getFullYear() + "-" + zeroPad((today.getMonth() + 1), 2) + "-" + today.getDate()
    document.getElementById('selectedDate').value = today;
    displayCategorized(today);
  }
  
  // Set today's date as the default value
  setDefaultDate();
  
  // Add event listener to update displayed date when date input changes
  document.getElementById('selectedDate').addEventListener('input', function () {
    clearTasks()
    displayTasksByDate(this.value);
  });

//getCategoryLabels()
// uncategorizedLabel()
displayCategorized()

