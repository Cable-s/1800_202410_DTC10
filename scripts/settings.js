var userID;
var checked;
var languageSelect = document.getElementById("languageSelect");
var timezoneSelect = document.getElementById("timezoneSelect");
var flexSwitch = document.querySelector(
  "#flexSwitchCheckChecked.form-check-input",
);
var fontSelect = document.getElementById("fontSelect");
var themeSelect = document.getElementById("themeSelect");
var submitBtn = document.getElementById("submitBtn");

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
async function userSettings() {
  let settings = await query().then((doc) => {
    let result = doc.data();
    localStorage.setItem("language", result.language);
    localStorage.setItem("fontSelect", result.fontSelect);
    localStorage.setItem("notifications", result.notifications);
    localStorage.setItem("themeSelect", result.themeSelect);
    localStorage.setItem("timezoneSelect", result.timezoneSelect);

    languageSelect.value = localStorage.getItem("language");
    timezoneSelect.value = localStorage.getItem("timezoneSelect");
    themeSelect.value = localStorage.getItem("themeSelect");
    fontSelect.value = localStorage.getItem("fontSelect");
  });
}
function updateSettings(newSetting) {
  Object.entries(newSetting).forEach(([key, value]) => {
    db.collection("users")
      .doc(`${userID}`)
      .collection("settings")
      .doc(`${localStorage.getItem("settingsID")}`)
      .update({ [key]: value })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
  userSettings();
}
function addListener() {
  submitBtn.addEventListener("submit", () => {
    updateSettings({
      language: languageSelect.value,
      fontSelect: fontSelect.value,
      themeSelect: themeSelect.value,
      notifications: flexSwitch.value,
    });
  });
}
addListeners();
userSettings();
