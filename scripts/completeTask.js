import { query } from "./queryDocuments.js";
let tasks = await query("tasks");
var userId = sessionStorage.getItem("userId");
function complete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      db.collection("users")
        .doc(userId)
        .collection("tasks")
        .doc(id)
        .delete()
        .then(() => {
          location.reload();
        });
    }
  }
}
window.complete = complete;
