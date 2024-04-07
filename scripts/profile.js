import { query } from "./queryDocuments.js";
import { getUser } from "./getUser.js";

const user = await getUser();
var userID = sessionStorage.getItem("userId");
var docID;
var categoriesDocID;
var ImageFile;
var profileData;
var categoryData;
var accountDate;
var notifications;
const username = document.getElementById("username");
const about = document.getElementById("about");
const birthday = document.getElementById("birthday");
const submit = document.getElementById("submit");
const joinDate = document.getElementById("joinDate");
const userPortrait = document.getElementById("userImg");
const button = document.getElementById("updateImg");
var flexSwitch = document.getElementById("flexSwitchCheckChecked");

var profileData = await query("profile");
var categoryData = await query("categories");
function listenFileSelect() {
  // listen for file selection

  // When a change happens to the File Chooser Input
  button.addEventListener("change", function (e) {
    ImageFile = e.target.files[0]; //Global variable
    var blob = URL.createObjectURL(ImageFile);
    userPortrait.src = blob; // Display this image
    uploadPic(docID);
  });
}

function uploadPic() {
  var storageRef = firebase
    .storage()
    .ref("images/" + profileData[0].docId + ".jpg");

  storageRef
    .put(ImageFile) //global variable ImageFile

    // AFTER .put() is done
    .then(function () {
      console.log("2. Uploaded to Cloud Storage.");
      storageRef
        .getDownloadURL()

        // AFTER .getDownloadURL is done
        .then(function (url) {
          // Get URL of the uploaded file
          console.log("3. Got the download URL.");

          // Now that the image is on Storage, we can go back to the
          // post document, and update it with an "image" field
          // that contains the url of where the picture is stored.
          db.collection("users")
            .doc(userID)
            .collection("profile")
            .doc(profileData[0].docId)
            .update({
              image: url, // Save the URL into users collection
            });
        })
        .catch((error) => {
          console.log("error uploading to cloud storage");
        });
    });
}

// populate the user's profile data
function loadProfile() {
  // Make sure we have the most current notification preference
  sessionStorage.setItem("notifications", profileData[0].notifications);
  username.value = user.displayName;
  about.value = profileData[0].about;
  birthday.value = profileData[0].birthday;
  joinDate.innerText =
    "Member since " + user.metadata.creationTime.slice(0, 16);
  flexSwitch.checked = sessionStorage.getItem("notifications");
  if (sessionStorage.getItem("notifications") == "on") {
    flexSwitch.checked = true;
  } else {
    flexSwitch.checked = false;
  }
  // specify a default image if  the user hasn't uploaded one yet
  if (profileData[0].image != null) {
    userPortrait.src = profileData[0].image;
  } else {
    userPortrait.src = "../images/user-icon.png";
  }
}

function deleteCategory(deletedCategory) {
  db.collection("users")
    .doc(userID)
    .collection("categories")
    .doc(categoryData[0].docId)
    .update({
      categories: firebase.firestore.FieldValue.arrayRemove(
        `${deletedCategory}`,
      ),
    })
    .then(() => location.reload());
}

function Categories() {
  let categoryArray = categoryData[0].categories;

  for (let i = 0; i < categoryArray.length; i++) {
    let color = "rgb(255, 197, 74)";
    let userCat = document.getElementById("user-categories");
    //
    // Create a new paragraph
    let newPar = document.createElement("p");

    // Add styling and classes
    newPar.classList.add("badge");
    newPar.style.width = "50%";
    newPar.style.backgroundColor = color;
    newPar.innerText = `${categoryArray[i]}`;

    // create a delete button and add styling
    let input = document.createElement("input");
    input.setAttribute("id", categoryArray[i]);
    input.setAttribute("type", "button");
    input.value = "x";
    input.addEventListener("click", () => {
      deleteCategory(categoryArray[i]);
    });

    // Add the new elements to the dom
    newPar.appendChild(input);
    userCat.appendChild(newPar);
  }
}

document.getElementById("add-category").addEventListener("click", () => {
  document.getElementById("category-name").style.display = "block";
  document.getElementById("add-category").style.display = "none";
  document.getElementById("submit-category").style.display = "block";
});

document.getElementById("submit-category").addEventListener("click", () => {
  let newcategory = document.getElementById("category-name").value;
  db.collection("users")
    .doc(`${userID}`)
    .collection("categories")
    .doc(`${categoryData[0].docId}`)
    .update({
      categories: firebase.firestore.FieldValue.arrayUnion(`${newcategory}`),
    })
    .then(() => {
      document.getElementById("category-name").style.display = "none";
      document.getElementById("add-category").style.display = "block";
      document.getElementById("submit-category").style.display = "none";
      location.reload();
    });
});

// Submit our profile update to Firestore and reload the page
submit.addEventListener("click", () => {
  sessionStorage.setItem("notifications", flexSwitch.value);

  // We need to update the username in a separate location
  // since it's apart of "authentication" and not the firestore
  user.updateProfile({
    displayName: `${username.value}`,
  });
  db.collection("users")
    .doc(`${userID}`)
    .collection("profile")
    .doc(`${profileData[0].docId}`)
    .update({
      about: `${about.value}`,
      birthday: `${birthday.value}`,
      notifications: `${flexSwitch.value}`,
    })
    // if we don't use the function here the page may reload before the changes are saved.
    .then(function () {
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Event listener for our checkbox
flexSwitch.addEventListener("change", function () {
  if (this.checked) {
    flexSwitch.value = "on";
  } else {
    flexSwitch.value = "off";
  }
});
loadProfile();
Categories();
listenFileSelect();
