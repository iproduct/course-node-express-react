var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("articles");
  var author1 = { name: "Ivar Jacobsen", address: "London, GB" };
  dbo.collection("authors").insertOne(author1, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    console.log(res);
    db.close();
  });
});
