// check all checkboxes
function checkAll() {
  var inputs = document.querySelectorAll(".aspect");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].checked = true;
  }
}
// send data to firestore when add categories button clicked
function submitForm() {
  var categoriesChecked = []; // Array to hold the selected categories

  // Capture all selected categories
  var checkboxes = document.querySelectorAll(".aspect:checked");
  checkboxes.forEach(function (checkbox) {
    categoriesChecked.push(checkbox.value);
  });

  // Add a blank category, grab it's id in "docRef" then add all of the info for the task
  const categories = db
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
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
