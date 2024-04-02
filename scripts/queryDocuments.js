function performQuery(userID, collectionType) {
  var returnArray = [];
  return db
    .collection("users")
    .doc(`${userID}`)
    .collection(`${collectionType}`)
    .get()
    .then((dataDoc) => {
      dataDoc.forEach((doc) => {
        let dataObject = doc.data();
        dataObject.docId = doc.id;
        if (collectionType == "tasks" && dataObject.title == undefined) {
          return;
        } else {
          returnArray.push(dataObject);
        }
      });
      return returnArray;
    });
}

export function query(collectionType) {
  var userID;
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userID = user.uid;
        // User is signed in.
        performQuery(userID, collectionType).then((result) => {
          resolve(result);
        });
      }
    });
  });
}
