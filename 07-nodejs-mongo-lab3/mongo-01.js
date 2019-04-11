var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("articles2");
  var authors = [{ name: "Adam Eckel", address: "New York, Sample Str. 192", age: 45 },
  { name: "Julie Gosling", address: "New Jersey, Elm Str 15", age: 58 }];
  const coll = dbo.collection("authors");
  coll.insertMany(authors, function(err, res) {
    if (err) throw err;
    console.log(`Document inserted: ${res.insertedCount}`);
    console.log(`Author Ids ${JSON.stringify(res.insertedIds)}`);
  });
  coll.find().toArray()
    .then(authors => authors.forEach( a => console.log(a) ))
    .catch(err => { throw err; })
    .finally( () => db.close() );
});