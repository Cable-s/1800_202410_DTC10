function getDate(user) {
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            signInDate = new Date(`${user.metadata.lastSignInTime}`);
            if (signInDate === 'undefined'){
                 signInDate = new Date(`${user.metadata.creationDate}`);
            }
            lastSignIn = signInDate.toLocaleDateString("en-US", options);
    return lastSignIn
}
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 

            userName = user.displayName;
            lastSignIn = getDate(user);
            
            //method #1:  insert with JS
            //document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            $("#name-goes-here").text(userName); //using jquery
            
            $("#last-signin").text(lastSignIn);
            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function
