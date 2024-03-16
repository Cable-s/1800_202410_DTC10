import { query } from './queryTasks.js';
let tasks = await query();
console.log(tasks)
