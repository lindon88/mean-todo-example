var uuid = require('node-uuid');

module.exports.id = "Todo-Create";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  // create collection todos
  this.db.createCollection("todos", {
    validator: {
      $or: [
        {
          id: { $type: "string" },
          userId: { $type: "string" },
          title: { $type: "string" }
        }
      ]
    }
  });

  // get current time
  var today = new Date();

  // get todos collection
  var collection = this.db.collection("todos");

  // insert an todo_ item for each user in database
  var users = this.db.collection("users");
  var usersCursor = users.find();
  usersCursor.each(function(err, item){
    if(!err && typeof item != "undefined" && item != null && typeof item.id != "undefined"){
      collection.insert({
        id: uuid.v4(),
        "userId": item.id,
        "title": "first todo",
        "isComplete": false,
        "isInFavorite": false,
        "priority": "1",
        "created": today.getTime(),
        "updated": today.getTime(),
        "completed": today.getTime()
      });
    }
  });

  // create compound index
  collection.createIndex({ "id": 1, "userId": 1 }, { unique: true });

  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  // drop collection todos
  var collection = this.db.collection("users");
  collection.drop();
  done();
};