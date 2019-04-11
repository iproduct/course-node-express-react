var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("articles2");
  dbo.createCollection("authors", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});