const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, dbs) {
    if (err) throw err;
    const db = dbs.db('webstore2');
    const product1 = {
        "name": "Super Mouse",
        "price": 16.5,
        "description": "Logitech wireless mouse",
        "imageUrl": "https://www.logitechg.com/content/dam/products/gaming/mice/g402-hyperion-fury-fps-gaming-mouse/910-004068/g402-hyperion-fury-ultra-fast-fps-gaming-mouse30.png.imgw.902.902.png"
    }
    db.collection('products').insertOne(product1, function (err, res) {
        if (err) throw err;
        if(res.insertedCount == 1) {
            console.log(`New product inserted with ID: ${res.insertedId}`);
            // console.log(res);
        }
        dbs.close();
    })
    console.log("Database created!");
});