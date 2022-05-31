const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async client => {
    console.log("Database connected.");
    const db = client.db('webstore_fmi_2022');
    const prod = await db.collection('products')
        .findOne({ _id: new ObjectId("5ed150848446d5ae645ac3c4") });
    console.log(prod);
    client.close();  
});

