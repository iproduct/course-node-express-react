const MongoClient = require('mongodb').MongoClient;
const mockPosts = require('./mock-posts');
const url = 'mongodb://localhost:27017';
const db_name = 'myblog9';



MongoClient.connect(url, { useUnifiedTopology: true }).then(con => {
    const db = con.db(db_name);
    console.log(`Connection extablished to ${db_name}.`);
    db.collection('posts').drop().then(delOK => {
        if (delOK) console.log("Collection deleted");
    }).then(() => {
        return db.collection('posts').insertMany(mockPosts);
    }).then(res => {
        // console.log(res);
        if (res.result.ok && res.insertedCount === 1) {
            console.log(`Blog post with ID=${res.insertedId} was successfully created.`);
        }
    }).then(() => {
        return db.collection('posts').find().toArray();
    }).then(posts => {
        console.log(posts);
    }).catch(err => {
        console.error(err);
    }).finally(() => {
        con.close();
    });
}).catch(err => console.error(err));

