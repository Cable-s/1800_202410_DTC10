function addTask() {
    console.log($('#taskModal').load('./text/addTaskModal.html'));
}

function setup() {
    console.log('setup complete')
}

$(document).ready(setup)