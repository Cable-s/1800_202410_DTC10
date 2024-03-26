var docId;

function query() {
  var data;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userID = user.uid;
        // User is signed in.
        data = db
          .collection("users")
          .doc(`${userID}`)
          .collection("profile")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              resolve(doc.id);
            });
          });
      }
    });
  });
}
async function queryProfile() {
  let profile = await query();
  docId = profile;
}

queryProfile();

console.log(docId);
