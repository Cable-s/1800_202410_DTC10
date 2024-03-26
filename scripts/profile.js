var userID;
var docID;
var accountDate;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const about = document.getElementById("about");
const birthday = document.getElementById("birthday");
const submit = document.getElementById("submit");
const joinDate = document.getElementById("joinDate");

function query() {
  var data;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userID = user.uid;
        accountDate = user.metadata.creationTime;
        // User is signed in.
        data = db
          .collection("users")
          .doc(`${userID}`)
          .collection("profile")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              docID = doc.id;
              resolve(doc.id);
            });
          });
      }
    });
  });
}

function loadProfile() {
  db.collection("users")
    .doc(`${userID}`)
    .collection("profile")
    .doc(`${docID}`)
    .get()
    .then((doc) => {
      let result = doc.data();
      firstName.value = result.firstName;
      lastName.value = result.lastName;
      about.value = result.about;
      birthday.value = result.birthday;
      joinDate.innerText = "Member since " + accountDate;
    });
}
async function queryProfile() {
  let profile = await query();
  return profile;
}

queryProfile().then((doc) => {
  loadProfile();
});

submit.addEventListener("click", () => {
  db.collection("users")
    .doc(`${userID}`)
    .collection("profile")
    .doc(`${docID}`)
    .update({
      firstName: `${firstName.value}`,
      lastName: `${lastName.value}`,
      about: `${about.value}`,
      birthday: `${birthday.value}`,
    })
    .then(console.log("Document written"))
    .catch((error) => {
      console.log(error);
    });
});
