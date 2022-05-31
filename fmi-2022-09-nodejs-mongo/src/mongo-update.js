const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, con) {
    if (err) throw err;
    const db = con.db('webstore4');
    db.collection('products')
        .updateOne({ name: 'Super Mouse' }, { $set: { price: 600 } })
        .then(res => {
            // console.log(res);
            db.collection('products')
                .find({ name: /^Super/ })
                .project({ name: 1, price: 1 })
                .sort({ price: 1 })
                .toArray().then(res => {
                    console.log(res);
                }).finally(() => con.close());
        }).catch(err => {
            console.log("Error: Update unsuccessfull.")
        })
});