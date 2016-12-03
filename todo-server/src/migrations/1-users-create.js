var uuid = require('node-uuid');
var md5 = require('md5');

module.exports.id = "Users-Create";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging

  // create collection users
  this.db.createCollection("users", {
    validator: {
      $or: [
        {
          id: { $type: "string" },
          email: { $type: "string" },
          password: { $type: "string" },
          userName: { $type: "string" }
        }
      ]
    }
  });

  // insert data to collection users
  var collection = this.db.collection("users");
  collection.insert({
    id: uuid.v4(),
    "userName": "admin",
    "firstName": "Lindon",
    "lastName": "Camaj",
    "email": "lindoncamaj88@gmail.com",
    "password": md5("1234")
  });

  // create indexes
  collection.createIndex({ "id": 1 }, { unique: true });
  collection.createIndex({ "userName": 2 }, { unique: true });
  collection.createIndex({ "email": 3 }, { unique: true });

  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  // drop collection users
  var collection = this.db.collection("users");
  collection.drop();
  done();
};