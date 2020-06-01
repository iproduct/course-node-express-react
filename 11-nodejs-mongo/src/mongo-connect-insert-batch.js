const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, dbs) {
    if (err) throw err;
    const db = dbs.db('webstore2');
    const products = [{
        "name": "Super Mouse",
        "price": 16.5,
        "description": "Logitech wireless mouse",
        "imageUrl": "https://www.logitechg.com/content/dam/products/gaming/mice/g402-hyperion-fury-fps-gaming-mouse/910-004068/g402-hyperion-fury-ultra-fast-fps-gaming-mouse30.png.imgw.902.902.png"
    },
    {
        "name": "Wireless Keyboard",
        "price": 23.85,
        "description": "Type whereever you are",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/G/01/aplus/detail-page/B005DKZTMG_K400_FOB_US_lg.jpg"
    },
    {
        "name": "Super Whiteboard Marker",
        "price": 5.32,
        "description": "Drawing is fun",
        "imageUrl": "https://www.esquoia.com/wp-content/uploads/2016/09/whiteboard-markers.jpg"
    }
    ];
    db.collection('products').insertMany(products, function (err, res) {
        if (err) throw err;
        if (res.insertedCount >= 1) {
            console.log(`${res.insertedCount} products successfully inserted.`);
            for(const idKey in res.insertedIds) {
                console.log(`with ID: ${res.insertedIds[idKey]}`);
            }
            // console.log(res);
        }
        dbs.close();
    })
    console.log("Database created!");
});