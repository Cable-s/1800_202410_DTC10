import { query } from "./queryDocuments.js";
import { getUser } from "./getUser.js";
import { logout } from "./script.js";

const user = await getUser();
const profileData = await query("profile");

function getDate(user) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let signInDate = new Date(`${user.metadata.lastSignInTime}`);
  if (signInDate === "undefined") {
    signInDate = new Date(`${user.metadata.creationDate}`);
  }
  let lastSignIn = signInDate.toLocaleDateString("en-US", options);
  return lastSignIn;
}
function getNameFromAuth() {
  // Check if a user is signed in:
  if (user) {
    // Do something for the currently logged-in user here:

    if (!sessionStorage.getItem("notifications")) {
      sessionStorage.setItem("notifications", profileData[0].notifications);
    }
    let userName = user.displayName;
    let lastSignIn = getDate(user);
    if (profileData[0].image != null) {
      document.getElementById("profile-image").src = profileData[0].image;
    }
    document.getElementById("name-goes-here").innerText = userName;

    document.getElementById("last-signin").innerText = lastSignIn;
    document.getElementById("name-goes-here").innerText = userName;
  } else {
    // No user is signed in.
    console.log("No user is logged in");
  }
}

getNameFromAuth(); //run the function
