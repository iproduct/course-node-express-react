const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, dbs) {
    if (err) throw err;
    const db = dbs.db('webstore2');
    db.collection('products')
        // .find({ name: /^Super/ })
        .find()
        .project({name: 1, price: 1})
        .sort({price: -1})
        .toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            dbs.close();
        })
    console.log("Database created!");
});