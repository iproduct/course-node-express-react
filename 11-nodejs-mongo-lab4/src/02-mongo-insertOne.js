const MongoClient = require('mongodb').MongoClient;
const mockPosts = require('./mock-posts');
const url = 'mongodb://localhost:27017';
const db_name = 'myblog9';



MongoClient.connect(url, { useUnifiedTopology: true }, function (err, con) {
    if (err) throw err;
    db = con.db(db_name);
    db.collection('posts').insertOne(mockPosts[0], (err, res) => {
        if (err) throw err;
        // console.log(res);
        if (res.result.ok && res.insertedCount === 1) {
            console.log(`Blog post with ID=${res.insertedId} was successfully created.`);
        }
        db.collection('posts').find().toArray((err, posts) => {
            if (err) throw err;
            console.log(posts);
            con.close();
        });
    });

    console.log(`Connection extablished to ${db_name}.`);
});