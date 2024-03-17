import { query } from './queryTasks.js';
let tasks = await query();
console.log(tasks);


function getCategoryLabels() {
    
    let categoryLabels = [];
    for (let i = 0; i < tasks.length; i++) {
        let category = tasks[i].category;
        categoryLabels.push(category);
    }
    categoryLabels.sort();
    //console.log(categoryLabels);
    let categories = [...new Set(categoryLabels)];
    categories.shift();
    categories.unshift('Un-categorized');
    // console.log(categories);
    return categories
}

// function uncategorizedLabel() {
//     console.log(tasks)
// }

function displayCategorized() {
    let categories = getCategoryLabels();
    console.log(categories)
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('categorized').innerHTML +=
        `
        <h1> `+categories[i]+` </h1>
        `
        for (let j = 0; j < tasks.length; j++) {
            if(categories[i] == tasks[j].category) {
                document.getElementById('categorized').innerHTML +=
                `<div>
                    <p> `+tasks[j].title+` </p>
                    <p> `+tasks[j].description+`</p>
                 </div>   
                `

            }
        }
    }        
}

getCategoryLabels()
// uncategorizedLabel()
displayCategorized()

