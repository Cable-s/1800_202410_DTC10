
function performCategoryQuery(userID) {
  var returnArray = [];
  return db.collection("users").doc(`${userID}`).collection("categories")
    .get()
    .then((categories) => {
      categories.forEach((doc) => {
        returnArray.push(doc.data());
      });
      return returnArray;
    });
}

function categoryQuery() {
  var userID;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userID = user.uid;
        // User is signed in.
        performCategoryQuery(userID).then((result) => {
          resolve(result);
          localStorage.setItem("categories", result);
        });
      }
    });
  });
}
let firstStep = categoryQuery();
let nextStep = firstStep.then