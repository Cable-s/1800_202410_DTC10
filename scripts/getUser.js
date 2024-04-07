// This function is for when we need more than just the user's uid
// This likely means we want the account creation date, or the username
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
