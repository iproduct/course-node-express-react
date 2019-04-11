var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("articles2");
  const coll = dbo.collection("authors");

  coll.updateOne({name : 'Adam Eckel'}, {$set: {age: 48} }, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

  coll.find().toArray()
    .then(authors => authors.forEach( a => console.log(a) ))
    .catch(err => { throw err; })
    .finally( () => db.close() );
});