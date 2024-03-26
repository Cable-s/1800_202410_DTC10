

//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function load(url, element) {
    // modified code from Stack Overflow question:
    // https://stackoverflow.com/questions/17901116/i-need-the-equivalent-of-load-to-js
    fetch(url)
        .then(response => response.text())
        .then(html => {
            element.innerHTML = html;
        })
}

function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.

            // Old jQuery code - causes browser to warn about deprecated feature
            // console.log($('#navbarTemplate').load('./text/nav_after_login.html'));
            // console.log($('#footerTemplate').load('./text/footer_after_login.html'));
            // console.log($('#addTaskModal').load('./text/addTaskModal.html'));
            load("./text/nav_after_login.html", document.getElementById("navbarTemplate"));
            load("./text/footer_after_login.html", document.getElementById("footerTemplate"));
            load("./text/addTaskModal.html", document.getElementById("addTaskModal"));
            // load("./text/defineCategoriesModal.html", document.getElementById("CategoriesModal"));
            load("./text/expiredTaskModal.html", document.getElementById("expiredTaskModal"));
        } else {
            // No user is signed in.

            // Old jQuery code - causes browser to warn about deprecated feature
            //console.log($('#navbarTemplate').load('./text/nav_before_login.html'));
            //console.log($('#footerTemplate').load('./text/footer.html'));
            load("./text/nav_before_login.html", document.getElementById("navbarTemplate"));
            load("./text/footer.html", document.getElementById("footerTemplate"));
        }
    });

}
loadSkeleton();
