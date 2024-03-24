// days selection shows up when repeat says weekly
function toggleRepeat() {
    var daysSelect = document.getElementById("daysSelect");
    console.log("Dropdown value:", this.value); // Log the value to check if it's "weekly"
    if (this.value === "weekly") {
        console.log("Showing days select");
        daysSelect.classList.remove("hidden");
    } else {
        console.log("Hiding days select");
        daysSelect.classList.add("hidden");
    }
  };

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
    var daysChecked = []; // Array to hold the selected days

    // If repeat is weekly, capture the selected days
    if (repeat === "weekly") {
        var checkboxes = document.querySelectorAll('.day:checked');
        checkboxes.forEach(function(checkbox) {
            daysChecked.push(checkbox.value);
        });
    }

    // Add a blank task, grab it's id in "docRef" then add all of the info for the task
    const task = db.collection("users").doc(firebase.auth().currentUser.uid).collection("tasks")
    task.add({}).then(docRef => {
        task.doc(docRef.id).set({
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
        id: docRef.id,
        repeatDay: daysChecked,
        status: [],
        })
    })
    .then(function() {
       location.href = 'categoryView.html';
    });
    }


function addTask() {
    console.log($('#taskModal').load('./text/addTaskModal.html'));
}

function setup() {
    console.log('setup complete');
    $("body").on("change", "#repeatSelect", toggleRepeat);
}

$(document).ready(setup);
