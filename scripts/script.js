function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("User logged out successfully.");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error during sign-out:", error);
    });
}
