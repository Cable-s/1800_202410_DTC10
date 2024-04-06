// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      //------------------------------------------------------------------------------------------
      // The code below is modified from default snippet provided by the FB documentation.
      //
      // If the user is a "brand new" user, then create a new "user" in your own database.
      // Assign this user with the name and email provided.
      // Before this works, you must enable "Firestore" from the firebase console.
      // The Firestore rules must allow the user to write.
      //------------------------------------------------------------------------------------------
      var user = authResult.user; // get the user object from the Firebase authentication database
      var userID = sessionStorage.setItem("userId", user.uid);
      var docRef; //used to delete empty task doc
      if (authResult.additionalUserInfo.isNewUser) {
        //if new user
        db.collection("users")
          .doc(user.uid)
          .set({
            //write to firestore. We are using the UID for the ID in users collection
            name: user.displayName, //"users" collection
            email: user.email, //with authenticated user's ID (user.uid)
            country: "Canada", //optional default profile info
            school: "BCIT", //optional default profile info
          })
          .then(function () {
            db.collection("users")
              .doc(user.uid)
              .collection("tasks")
              .add({
                // Add 'tasks' collection to users
              })
              .then((docRef) => {
                console.log("User collections added");
                docRef = docRef.id;
              })
              .catch(function (error) {
                console.log(error);
              });
            console.log("New user added to firestore");
            window.location.assign("defineCategories.html"); //set up categories after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });

        db.collection("users").doc(user.uid).collection("settings").add({
          language: "English",
          timezoneSelect: "America/Vancouver",
          notifications: "on",
          fontSelect: "medium",
          themeSelect: "light",
          // Add 'settings' collection to users
        });
        db.collection("users").doc(user.uid).collection("profile").add({
          about: null,
          birthday: null,
          name: user.displayName,
          image: null,
          interests: null,
          lastName: null,
        });
      } else {
        return true;
      }
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "main.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],

  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);
