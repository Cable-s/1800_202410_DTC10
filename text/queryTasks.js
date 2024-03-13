db.collection(collection)
  .get()
  .then((querySnapshot) => {
    var arr = []
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      var category = data.category;
      var description = data.description;
      var importance = data.importance;
      var title = data.title;
      var docID = doc.id;
      var startDate = data.startDate;
      var startTime = data.startTime;
      var endDate = data.endDate;
      var endTime = data.endTime;
      var repeat = data.repeat;

      // Push data to the array
      arr.push({
        category: category,
        description: description,
        importance: importance,
        title: title,
        docID: docID,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        repeat: repeat
      });
    });

    console.log(arr);
  });
