import { query } from './queryTasks.js';
let tasks = await query();



function complete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("tasks").doc(id).delete().then(() => { location.reload() })
    }
  }
}
window.complete = complete