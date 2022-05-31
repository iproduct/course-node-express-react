const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async client => {
    const db = client.db('webstore4');
    console.log("Database connected!");
    const products = [{
        "_id": new ObjectId('5ed150848446d5ae645ac3c5'),
        "name": "Super Mouse",
        "price": 16.5,
        "description": "Logitech wireless mouse",
        "imageUrl": "https://www.logitechg.com/content/dam/products/gaming/mice/g402-hyperion-fury-fps-gaming-mouse/910-004068/g402-hyperion-fury-ultra-fast-fps-gaming-mouse30.png.imgw.902.902.png"
    },
    {
        "_id": new ObjectId('5ed150848446d5ae645ac3c6'),
        "name": "Wireless Keyboard",
        "price": 23.85,
        "description": "Type whereever you are",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/G/01/aplus/detail-page/B005DKZTMG_K400_FOB_US_lg.jpg"
    },
    {
        "_id": new ObjectId('5ed150848446d5ae645ac3c4'),
        "name": "Super Whiteboard Marker",
        "price": 5.32,
        "description": "Drawing is fun",
        "imageUrl": "https://www.esquoia.com/wp-content/uploads/2016/09/whiteboard-markers.jpg"
    }
    ];
    try {
        // await db.collection('products').drop();
        const res = await db.collection('products').insertMany(products);
        if (res.insertedCount >= 1) {
            console.log(`${res.insertedCount} products successfully inserted.`);
            for (const idKey in res.insertedIds) {
                console.log(`with ID: ${res.insertedIds[idKey]}`);
            }
            // console.log(res);
        }
    } finally {
        client.close();
    }
    
});