const MongoClient = require('mongodb').MongoClient;
const mockPosts = require('./mock-posts');
const url = 'mongodb://localhost:27017';
const db_name = 'myblog9';

demo().then(posts => {
    console.log(`Demo finished.`);
});

async function demo() {
    try {
        const con = await MongoClient.connect(url, { useUnifiedTopology: true });
        try {
            const db = con.db(db_name);
            console.log(`Connection extablished to ${db_name}.`);
            const delOK = await db.collection('posts').drop();
            if (delOK) console.log("Collection deleted");
            const insertedRes = await db.collection('posts').insertMany(mockPosts);
            if (insertedRes.result.ok && insertedRes.insertedCount === 1) {
                console.log(`Blog post with ID=${insertedRes.insertedId} was successfully created.`);
            }
            const posts = await db.collection('posts').find().toArray();
            console.log(posts);
            return posts;
        } catch (err) {
            console.error(err);
        } finally {
            con.close();
        }
    } catch (err) {
        console.error(err)
    }
}

