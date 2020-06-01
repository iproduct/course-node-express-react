const MongoClient = require('mongodb').MongoClient;
const mockUsers = require('./mock-users');
const url = 'mongodb://localhost:27017';
const db_name = 'myblog9';

demo().then(users => {
    console.log(`Demo finished.`);
});

async function demo() {
    try {
        const con = await MongoClient.connect(url, { useUnifiedTopology: true });
        try {
            const db = con.db(db_name);
            console.log(`Connection extablished to ${db_name}.`);
            try {
                const delOK = await db.collection('users').drop();
                if (delOK) console.log("Collection deleted");
            } catch (err) {
                console.error(err);
            } finally {
                const insertedRes = await db.collection('users').insertMany(mockUsers);
                if (insertedRes.result.ok && insertedRes.insertedCount === 1) {
                    console.log(`Blog post with ID=${insertedRes.insertedId} was successfully created.`);
                }
                const users = await db.collection('users').find().toArray();
                console.log(users);
                return users;
            }
        } catch (err) {
            console.error(err);
        } finally {
            con.close();
        }
    } catch (err) {
        console.error(err)
    }
}

