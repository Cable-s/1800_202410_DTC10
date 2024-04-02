import { query } from "./queryDocuments.js";

var userID = localStorage.getItem("userId");
var docID;
var categoriesDocID;
var ImageFile;
var profileData;
var categoryData;
var accountDate;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const about = document.getElementById("about");
const birthday = document.getElementById("birthday");
const submit = document.getElementById("submit");
const joinDate = document.getElementById("joinDate");
const userPortrait = document.getElementById("userImg");
const button = document.getElementById("updateImg");

profileData = await query("profile");
console.log(profileData);
categoryData = await query("categories");
console.log(categoryData);
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

function uploadPic(postDocID) {
  console.log("inside uploadPic " + postDocID);
  var storageRef = firebase.storage().ref("images/" + postDocID + ".jpg");

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
            .doc(postDocID)
            .update({
              image: url, // Save the URL into users collection
            });
        })
        .catch((error) => {
          console.log("error uploading to cloud storage");
        });
    });
}

function loadProfile() {
  firstName.value = profileData[0].firstName;
  lastName.value = profileData[0].lastName;
  about.value = profileData[0].about;
  birthday.value = profileData[0].birthday;
  joinDate.innerText = "Member since " + accountDate;
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

Categories();

function Categories() {
  let categoryArray = categoryData[0].categories;
  console.log("categoryArray", categoryArray);

  let colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];
  for (let i = 0; i < categoryArray.length; i++) {
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    let userCat = document.getElementById("user-categories");
    //
    // Create a new paragraph
    let newPar = document.createElement("p");

    // Add styling and classes
    newPar.classList.add("badge");
    newPar.style.width = "100%";
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
  console.log("clicked");
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

submit.addEventListener("click", () => {
  db.collection("users")
    .doc(`${userID}`)
    .collection("profile")
    .doc(`${profileData[0].docId}`)
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

loadProfile();
listenFileSelect();
