export async function getUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        resolve(user);
      } else {
        // User is signed out
        reject("User is signed out");
      }
    });
  });
}
