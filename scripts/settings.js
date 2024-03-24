function query() {
  var userID;
  var data;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userID = user.uid;
        // User is signed in.
        data = db
          .collection("users")
          .doc(`${userID}`)
          .collection("settings")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              localStorage.setItem("settingsID", doc.id);
              resolve(doc);
            });
          });
      }
    });
  });
}
let userSettings = await query().then((doc) => {
  let result = doc.data();
  localStorage.setItem("language", result.language);
  localStorage.setItem("fontSelect", result.fontSelect);
  localStorage.setItem("notifications", result.notifications);
  localStorage.setItem("themeSelect", result.themeSelect);
  localStorage.setItem("timezoneSelect", result.timezoneSelect);
});
