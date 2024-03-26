function getDate(user) {
  options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  signInDate = new Date(`${user.metadata.lastSignInTime}`);
  if (signInDate === "undefined") {
    signInDate = new Date(`${user.metadata.creationDate}`);
  }
  lastSignIn = signInDate.toLocaleDateString("en-US", options);
  return lastSignIn;
}
function getNameFromAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here:

      userName = user.displayName;
      lastSignIn = getDate(user);

      //method #1:  insert with JS
      document.getElementById("name-goes-here").innerText = userName;

      //method #2:  insert using jquery

      document.getElementById("last-signin").innerText = lastSignIn;
      //method #3:  insert using querySelector
      document.getElementById("name-goes-here").innerText = userName;
    } else {
      // No user is signed in.
      console.log("No user is logged in");
    }
  });
}
function displayCategoryModal() {
  firebase.auth().onAuthStateChanged((user) => {
    lastSignIn = user.metadata.lastSignInTime;
    console.log(lastSignIn);
    creationTime = user.metadata.creationTime;
    console.log(creationTime);
    if (lastSignIn === creationTime) {
      let modal = new bootstrap.Modal(document.getElementById("categoryModal"));
      modal.show();
      console.log("Category Modal displayed");
    }
  });
}
getNameFromAuth(); //run the function
displayCategoryModal(); //displays the category modal if the user is a new user
