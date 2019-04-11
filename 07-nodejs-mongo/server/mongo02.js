var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("articles");
  var author1 = { name: "Eric Evans", address: "New York, USA" };
  dbo.collection("authors").find({address: /^New/}).project({name: 1, address:1}).sort({name: -1}).toArray(function(err, res) {
    if (err) throw err;
    console.log("Documents found:");
    console.log(res);
    db.close();
  });
});
