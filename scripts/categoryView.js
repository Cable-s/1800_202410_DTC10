import { query } from './queryTasks.js';
let tasks = await query();
console.log(tasks);


function getCategoryLabels(selectedDate) {
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    let categoryLabels = [];
    for (let i = 0; i < tasks.length; i++) {
        let startDate = new Date(tasks[i].startDate.seconds*1000)
        let endDate = new Date(tasks[i].endDate.seconds*1000)
        let start = startDate.getFullYear() + "-" + zeroPad((startDate.getMonth() + 1), 2) + "-" + zeroPad(startDate.getDate(),2)
        let end = endDate.getFullYear() + "-" + zeroPad((endDate.getMonth() + 1), 2) + "-" + zeroPad(endDate.getDate(),2)
        // console.log(start);
        // console.log(selectedDate);
        // console.log(end);
        console.log(i, start <= selectedDate && selectedDate <= end)
        if ((start <= selectedDate && selectedDate <= end)) {
            let category = tasks[i].category;
            categoryLabels.push(category);
        }
    }
    categoryLabels.sort();
    let categories = [...new Set(categoryLabels)];
    //categories.shift();  // didn't know the purpose of this. It was deleting the first element which was a category
    return categories
}

// function uncategorizedLabel() {
//     console.log(tasks)
// }

function displayCategorized(selectedDate) {
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    // console.log(selectedDate)
    let categories = getCategoryLabels(selectedDate);
    console.log(categories)
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('categorized').innerHTML +=
            `
            <h1> `+ categories[i] + ` </h1>
            `
        for (let j = 0; j < tasks.length; j++) {
            let startDate = new Date(tasks[j].startDate.seconds*1000)
            let endDate = new Date(tasks[j].endDate.seconds*1000)
            let start = startDate.getFullYear() + "-" + zeroPad((startDate.getMonth() + 1), 2) + "-" + zeroPad(startDate.getDate(),2)
            let end = endDate.getFullYear() + "-" + zeroPad((endDate.getMonth() + 1), 2) + "-" + zeroPad(endDate.getDate(),2)
            // console.log(start);
            // console.log(selectedDate);
            // console.log(end);
            console.log(start <= selectedDate && selectedDate <= end)
            if ((start <= selectedDate && selectedDate <= end)) {
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
    today = today.getFullYear() + "-" + zeroPad((today.getMonth() + 1), 2) + "-" + zeroPad(today.getDate(),2)
    document.getElementById('selectedDate').value = today;
    getCategoryLabels(today);
    displayCategorized(today);
  }
  
  // Set today's date as the default value
  setDefaultDate();
  
  // Add event listener to update displayed date when date input changes
  document.getElementById('selectedDate').addEventListener('input', function () {
    clearTasks()
    getCategoryLabels(this.value)
    displayCategorized(this.value)
  });

  function clearTasks() {
    console.log("clear")
    document.getElementById('categorized').innerHTML = ""
  }
//getCategoryLabels()
// uncategorizedLabel()
// displayCategorized()

