//-------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "../index.html";
        console.log("logging out user");
        localStorage.clear();
      }).catch((error) => {
        // An error happened.
      });
}
