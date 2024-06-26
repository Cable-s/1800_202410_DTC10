import { logout } from "./script.js";
//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function load(url, element) {
  // modified code from Stack Overflow question:
  // https://stackoverflow.com/questions/17901116/i-need-the-equivalent-of-load-to-js
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      if (element !== null) {
        element.innerHTML = html;
      }
    });
}

// Wait for an element to appear on the page - used to add eventListener to logout button
function waitForDomNode(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      load(
        "./text/nav_after_login.html",
        document.getElementById("navbarTemplate"),
      );
      // Wait for the navbar to load before adding event listener to the logout button
      waitForDomNode("#logoutButton").then((elm) => {
        document
          .getElementById("logoutButton")
          .addEventListener("click", function () {
            logout();
          });
      });
      load(
        "./text/footer_after_login.html",
        document.getElementById("footerTemplate"),
      );
      load("./text/addTaskModal.html", document.getElementById("addTaskModal"));
      load(
        "./text/expiredTaskModal.html",
        document.getElementById("expiredTaskModal"),
      );
    } else {
      // No user is signed in.

      load(
        "./text/nav_before_login.html",
        document.getElementById("navbarTemplate"),
      );
    }
  });
}
loadSkeleton();
