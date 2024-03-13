// days selection shows up when repeat says weekly
document.getElementById("repeatSelect").addEventListener("change", function () {
    var daysSelect = document.getElementById("daysSelect");
    console.log("Dropdown value:", this.value); // Log the value to check if it's "weekly"
    if (this.value === "weekly") {
        console.log("Showing days select");
        daysSelect.classList.remove("hidden");
    } else {
        console.log("Hiding days select");
        daysSelect.classList.add("hidden");
    }
  });

// check all checkboxes
function checkAll() {
    var inputs = document.querySelectorAll('.day');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = true;
    }
}
// send data to firestore when add task button clicked
function submitForm() {
    var title = document.getElementById('title-input').value;
    var description = document.getElementById('description-input').value;
    var category = document.getElementById('category-input').value;
    var startDate = document.getElementById('startDate').value;
    var startTime = document.getElementById('startTime').value;
    var endDate = document.getElementById('endDate').value;
    var endTime = document.getElementById('endTime').value;
    var importance = document.getElementById('importanceSelect').value;
    var repeat = document.getElementById('repeatSelect').value;
    // need to work on the days selected.
    var daysChecked = document.getElementsByName('day');

    var task = db.collection("tasks");
    task.add({
        user: firebase.auth().currentUser.uid,
        category: category,
        description: description,
        importance: importance,
        title: title,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        repeat: repeat,
        // repeatDay: daysChecked,
        status: [],
    }).then(function () {
        location.href = 'categoryView.html';
    });
}


function addTask() {
    console.log($('#taskModal').load('./text/addTaskModal.html'));
}

function setup() {
    console.log('setup complete')
}

$(document).ready(setup)