var userId = sessionStorage.getItem("userId");
// check all checkboxes
function checkAll() {
  var inputs = document.querySelectorAll(".aspect");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].checked = true;
  }
}
// send data to firestore when add categories button clicked
function submitCategoryForm() {
  var categoriesChecked = []; // Array to hold the selected categories

  // Capture all selected categories
  var checkboxes = document.querySelectorAll(".aspect:checked");
  checkboxes.forEach(function (checkbox) {
    categoriesChecked.push(checkbox.value);
  });
  categoriesChecked.push("Un-categorized");

  // Add a blank category, grab it's id in "docRef" then add all of the info for the task
  const categories = db
    .collection("users")
    .doc(userId)
    .collection("categories");
  categories
    .add({})
    .then((docRef) => {
      categories.doc(docRef.id).set({
        categories: categoriesChecked,
      });
    })
    .then(function () {
      location.href = "main.html";
    });
}

function addCategories() {
  console.log($("#CategoriesModal").load("./defineCategories.html"));
}

function setup() {
  console.log("Category setup complete");
}

$(document).ready(setup);
