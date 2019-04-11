var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("articles");
  var author1 = { name: "Eric Evans2", address: "New York, USA" };
  dbo.collection("authors")
    .find()
    // .find({address: /^New/})
    // .project({name: 1, address:1})
    .sort({name: -1}).toArray()
  .then(res => {
    console.log("Documents found:");
    console.log(res);
    db.close();
  })
  .catch(err => { throw err })
  .finally(() => db.close());
});
