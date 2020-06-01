const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, dbs) {
    if (err) throw err;
    const db = dbs.db('myblog9');
    db.collection('posts')
        .find({ title: /React/ })
        // .find()
        .limit(3)
        .project({title: 1, authors: 1})
        .sort({author: 1})
        .toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            dbs.close();
        })
    console.log("Database created!");
});