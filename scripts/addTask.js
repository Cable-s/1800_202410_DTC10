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
        status: [],
    }).then(function () {
        location.href = 'categoryView.html';
    });
}


// days selection shows up when repeat says weekly
document.getElementById("repeatSelect").addEventListener("change", function () {
    var daysSelection = document.getElementById("daysSelection");
    if (this.value === "weekly") {
        daysSelection.classList.remove("hidden");
    } else {
        daysSelection.classList.add("hidden");
    }
});


function addTask() {
    console.log($('#taskModal').load('./text/addTaskModal.html'));
}

function setup() {
    console.log('setup complete')
}

$(document).ready(setup)