export function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("User logged out successfully.");
      window.location.assign = "../index.html";
    })
    .catch((error) => {
      console.error("Error during sign-out:", error);
    });
}
firebase.auth().onAuthStateChanged(function (user) {
  if (!user && window.location.pathname !== "/index.html") {
    // If user is signed out, redirect to login page
    window.location.assign("index.html");
  }
});
