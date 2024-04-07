var userID = sessionStorage.getItem("userId");
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
  return new Promise((resolve, reject) => {
    // User is signed in.
    performQuery(userID, collectionType).then((result) => {
      resolve(result);
    });
  });
}
