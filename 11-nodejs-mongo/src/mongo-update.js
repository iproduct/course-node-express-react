const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, con) {
    if (err) throw err;
    const db = con.db('webstore2');
    db.collection('products')
        .updateOne({ name: 'Super Keyboard' }, { $set: { price: 125.3 } })
        .then(res => {
            console.log(res);
            db.collection('products')
                .find({ name: /^Super/ })
                .project({ name: 1, price: 1 })
                .sort({ price: 1 })
                .toArray(function (err, res) {
                    if (err) throw err;
                    console.log(res);
                });
        }).catch(err => {
            console.log("Error: Update unsuccessfull.")
        }).finally(() => {
            con.close();
        })

});