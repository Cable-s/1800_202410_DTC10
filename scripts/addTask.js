import { query } from "./queryDocuments.js";

var userID = sessionStorage.getItem("userId");
var categories = await query("categories");
function showError(inputId, errorMessage) {
  document.getElementById(inputId + "-error").textContent = errorMessage;
}

function submitForm() {
  var fieldsToValidate = [
    {
      inputId: "title",
      errorId: "title-error",
      value: document.getElementById("title-input").value,
      errorMessage: "Title is required",
    },
    {
      inputId: "startDate",
      errorId: "startDate-error",
      value: document.getElementById("startDate").value,
      errorMessage: "Start date is required",
    },
    {
      inputId: "startTime",
      errorId: "startTime-error",
      value: document.getElementById("startTime").value,
      errorMessage: "Start time is required",
    },
    {
      inputId: "endDate",
      errorId: "endDate-error",
      value: document.getElementById("endDate").value,
      errorMessage: "End date is required",
    },
    {
      inputId: "endTime",
      errorId: "endTime-error",
      value: document.getElementById("endTime").value,
      errorMessage: "End time is required",
    },
    {
      inputId: "importanceSelect",
      errorId: "importance-error",
      value: document.getElementById("importanceSelect").value,
      errorMessage: "Importance is required",
    },
  ];

  fieldsToValidate.forEach(function (field) {
    // Clear existing error message
    document.getElementById(field.errorId).textContent = "";

    // Validate and show error message if necessary
    if (!field.value) {
      showError(field.inputId, field.errorMessage);
    }
  });

  // Check for start and end date/time validation
  var category = document.getElementById("category-input").value;
  var description = document.getElementById("description-input").value;
  console.log(document.getElementById("endDate").value);
  var startDate = new Date(
    document.getElementById("startDate").value + "T00:00:00",
  );
  var endDate = new Date(
    document.getElementById("endDate").value + "T00:00:00",
  );
  console.log(
    "documents",
    document.getElementById("startDate").value,
    document.getElementById("endDate").value,
  );
  var startTime = document.getElementById("startTime").value;
  var endTime = document.getElementById("endTime").value;
  var error = false;
  if (startDate.getTime() > endDate.getTime()) {
    error = true;
    console.log("true");
    showError("endDate", "End date must be after start date");
  }

  if (startDate.getTime() == endDate.getTime() && startTime >= endTime) {
    error = true;
    console.log("true");
    showError("endTime", "End time must be after start time");
  }

  if (endDate.getTime() < startDate.getTime()) {
    error = trued;
    console.log("true");
    showError("endDate", "End date cannot be before start date");
  }

  var title = fieldsToValidate[0].value;
  var importance = fieldsToValidate[5].value;

  if (
    title &&
    startDate &&
    startTime &&
    endDate &&
    endTime &&
    importance &&
    !error
  ) {
    // Proceed with form submission
    const task = db.collection("users").doc(userID).collection("tasks");
    task
      .add({})
      .then((docRef) => {
        task.doc(docRef.id).set({
          user: userID,
          category: category,
          description: description,
          importance: importance,
          title: title,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          id: docRef.id,
          status: [],
        });
      })
      .then(function () {
        location.reload();
      });
  }
}
async function populateCategories() {
  let categoryNames = await query("categories");
  categoryNames = categoryNames[0].categories;
  categoryNames.sort();
  document.getElementById("category-input").innerHTML = ``;
  categoryNames.forEach((category, index) => {
    document.getElementById("category-input").innerHTML += `
    <option value="${category}" >${category}</option>
    `;
  });
  setDefaultCategoryInput();
}
function addNewCategory() {
  document.getElementById("add-category").addEventListener("click", () => {
    console.log("clicked");
    document.getElementById("category-name").style.display = "block";
    document.getElementById("add-category").style.display = "none";
    document.getElementById("submit-category").style.display = "block";
    submitNewCategory();
  });
}
function submitNewCategory() {
  document.getElementById("submit-category").addEventListener("click", () => {
    let newcategory = document.getElementById("category-name").value;
    console.log(newcategory);
    db.collection("users")
      .doc(userID)
      .collection("categories")
      .doc(categories[0].docId)
      .update({
        categories: firebase.firestore.FieldValue.arrayUnion(newcategory),
      })
      .then(() => {
        populateCategories();
        document.getElementById("category-name").style.display = "none";
        document.getElementById("category-name").value = "";
        document.getElementById("add-category").style.display = "block";
        document.getElementById("submit-category").style.display = "none";
      });
  });
}

function displayCharactersLeft() {
  let currentDescLetters =
    document.getElementById("description-input").value.length;
  let currentTitleLetters = document.getElementById("title-input").value.length;
  let maxTitleLength = 25;
  let maxDescLength = 60;
  document.getElementById("spanDescAmount").innerHTML =
    `  ${currentDescLetters} / ${maxDescLength}`;
  document.getElementById("spanTitleAmount").innerHTML =
    `  ${currentTitleLetters} / ${maxTitleLength}`;
}

document.getElementById("description-input").addEventListener("input", () => {
  displayCharactersLeft();
});

document.getElementById("title-input").addEventListener("input", () => {
  displayCharactersLeft();
});

function addTask() {
  //console.log($("#taskModal").load("./text/addTaskModal.html"));
  fetch("./text/addTaskModal.html")
    .then((res) => res.text())
    .then((html) => {
      const nodes = new DOMParser().parseFromString(html, "text/html");
      const body = nodes.querySelector("#taskModal");

      document.documentElement.removeChild(document.body);
      document.documentElement.appendChild(body);
    });
}

function setup() {
  populateCategories();
  addNewCategory();
  setDefaultDate();
  setDefaultEndDate();
  document.getElementById("addTaskBtn").addEventListener("click", () => {
    submitForm();
  });
  console.log("setup complete");
}

function setDefaultDate() {
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  let today = new Date();
  today =
    today.getFullYear() +
    "-" +
    zeroPad(today.getMonth() + 1, 2) +
    "-" +
    zeroPad(today.getDate(), 2);
  document.getElementById("startDate").value = today;
}

document.getElementById("startDate").addEventListener("input", () => {
  setDefaultEndDate();
});

function setDefaultEndDate() {
  let today = document.getElementById("startDate").value;
  document.getElementById("endDate").value = today;
}

function setDefaultCategoryInput() {
  document.getElementById("category-input").value = "Un-categorized";
}

$(document).ready(setup);
