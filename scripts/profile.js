var userID;
var docID;
var categoriesDocID;
var ImageFile;
var accountDate;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const about = document.getElementById("about");
const birthday = document.getElementById("birthday");
const submit = document.getElementById("submit");
const joinDate = document.getElementById("joinDate");
const userPortrait = document.getElementById("userImg");
const button = document.getElementById("updateImg");

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
function queryCategories() {
  var categories;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userID = user.uid;
        accountDate = user.metadata.creationTime;
        // User is signed in.
        categories = db
          .collection("users")
          .doc(`${userID}`)
          .collection("categories")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              categoriesDocID = doc.id;
              resolve(doc.id);
            });
          })
      }
    });
  });
}
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

//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
//
// This function is called AFTER the post has been created,
// and we know the post's document id.
//------------------------------------------------
function uploadPic(postDocID) {
  console.log("inside uploadPic " + postDocID);
  var storageRef = storage.ref("images/" + postDocID + ".jpg");

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
            })
            // AFTER .update is done
            .then(function () {
              console.log("4. Added pic URL to Firestore.");
              // One last thing to do:
              // save this postID into an array for the OWNER
              // so we can show "my posts" in the future
            });
        });
    })
    .catch((error) => {
      console.log("error uploading to cloud storage");
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
      if (result.image != null) {
        userPortrait.src = result.image;
      } else {
        userPortrait.src = "../images/png-transparent-user.png";
      }
    });
}
async function queryProfile() {
  let profile = await query();
  return profile;
}

async function getCategories() {
  let categories = await queryCategories();
  return categories;
}

queryProfile().then((doc) => {
  loadProfile();
});

getCategories().then((doc) => {
  console.log(doc)
  db.collection("users")
    .doc(`${userID}`)
    .collection("categories")
    .doc(`${doc}`)
    .get()
    .then((doc) => {
      categoryArray = doc.data().categories;
      console.log(categoryArray)
      for (i = 0; i < categoryArray.length; i++) {
        document.getElementById("user-categories").innerHTML += `<p class="badge bg-success">${categoryArray[i]}</p>`
      }
    })
  // document.getElementById("categories").innerHTML
})

function showButton(element, state) {
  state === "show"
    ? (element.style.display = "flex")
    : (element.style.display = "none");
}
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

userPortrait.addEventListener("mouseover", () => {
  showButton(button, "show");
});
userPortrait.addEventListener("mouseout", () => {
  showButton(button, "hide");
});

listenFileSelect();
