
function performQuery(userID){
  var returnArray = [];
  db.collection("users").doc(`${userID}`).collection("tasks").where("title", "!=", false)
  .get()
  .then((tasks) => {
      tasks.forEach((doc) =>{
        returnArray.push(doc.data());
      })
      })
      return returnArray
  }

export function query(){
  var userID
  var result
  return new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      userID = user.uid
      result = performQuery(userID);
      resolve(result)}
      })
  }
)};


