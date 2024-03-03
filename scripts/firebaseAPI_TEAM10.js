//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyAlpJjol0uII_NUFingXJ5cbe8KC_bzp9g",
  authDomain: "timecraft-91667.firebaseapp.com",
  projectId: "timecraft-91667",
  storageBucket: "timecraft-91667.appspot.com",
  messagingSenderId: "122128642093",
  appId: "1:122128642093:web:9d35fb9064e2649ff6c8a4"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//const storage = firebase.storage();



// TEST CHANGE