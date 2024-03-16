
function performQuery(userID){
  var returnArray = [];
  return db.collection("users").doc(`${userID}`).collection("tasks").where("title", "!=", false)
  .get()
  .then((tasks) => {
      tasks.forEach((doc) =>{
        returnArray.push(doc.data());
      });
      return returnArray;
      });
  }

export function query(){
  var userID;
  return new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userID = user.uid;
      // User is signed in.
      performQuery(userID).then((result) => {
      resolve(result);
      });
      }
  });
  });
}


