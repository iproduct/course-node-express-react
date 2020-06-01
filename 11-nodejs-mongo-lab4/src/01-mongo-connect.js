const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const db_name = 'myblog9';

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, con) {
    if (err) throw err;
    db = con.db(db_name);
    db.collection('posts').find().toArray((err, posts) =>{
        if (err) throw err;
        console.log(posts);
        con.close();
    });
    console.log(`Connection extablished to ${db_name}.`);
});