var userID;
var checked;
var languageSelect = document.getElementById("languageSelect");
var timezoneSelect = document.getElementById("timezoneSelect");
var flexSwitch = document.getElementById("flexSwitchCheckChecked");
var fontSelect = document.getElementById("fontSelect");
var themeSelect = document.getElementById("themeSelect");
var submitBtn = document.getElementById("submit");

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
    // localStorage.setItem("language", result.language);
    // localStorage.setItem("fontSelect", result.fontSelect);
    localStorage.setItem("notifications", result.notifications);
    // localStorage.setItem("themeSelect", result.themeSelect);
    // localStorage.setItem("timezoneSelect", result.timezoneSelect);

    // languageSelect.value = localStorage.getItem("language");
    // timezoneSelect.value = localStorage.getItem("timezoneSelect");
    // themeSelect.value = localStorage.getItem("themeSelect");
    // fontSelect.value = localStorage.getItem("fontSelect");
    flexSwitch.value = localStorage.getItem("notifications");
    if (localStorage.getItem("notifications") == "true") {
      flexSwitch.checked = true;
    } else {
      flexSwitch.checked = false;
    }
  });
}
function updateSettings(newSetting) {
  console.log(newSetting);
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
function submitForm() {
  updateSettings({
    // language: languageSelect.value,
    // fontSelect: fontSelect.value,
    // themeSelect: themeSelect.value,
    notifications: flexSwitch.checked,
    // timezoneSelect: timezoneSelect.value,
  });
}

submitBtn.addEventListener("click", submitForm);
userSettings();
