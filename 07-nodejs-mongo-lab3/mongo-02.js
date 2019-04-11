var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("articles2");
  
  const coll = dbo.collection("authors");
  
  coll.find({address: /^New York/})
  .project({ name: 1, age: 1 })
  .sort({"age": 1})
  .toArray()
    .then(authors => authors.forEach( a => console.log(a) ))
    .catch(err => { throw err; })
    .finally( () => db.close() );
});