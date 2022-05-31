const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connection => {
    const db = connection.db('webstore4');
    db.collection('products')
        // .find({ name: /^Super/ })
        .find()
        // .filter({ name: /^Super/ })
        .project({name: 1, price: 1})
        .sort({price: -1})
        .toArray().then(res => {
            console.log(res);
            connection.close();
        }).finally(() => connection.close());
    console.log("Database connected.");
});