const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, dbs) {
    if (err) throw err;
    const db = dbs.db('webstore2');
    const orders = [{
        "prod_id": new ObjectID('5ed150848446d5ae645ac3c5'),
        "status": 1
    },
    {
        "prod_id": new ObjectID('5ed150848446d5ae645ac3c6'),
        "status": 1
    },
    {
        "prod_id": new ObjectID('5ed150848446d5ae645ac3c4'),
        "status": 3
    }
    ];
    db.collection('orders').drop()
        .then(dropRes => {
            db.collection('orders').insertMany(orders)
                .then(res => {
                    if (err) throw err;
                    if (res.insertedCount >= 1) {
                        console.log(`${res.insertedCount} orders successfully inserted.`);
                        for (const idKey in res.insertedIds) {
                            console.log(`with ID: ${res.insertedIds[idKey]}`);
                        }
                        // console.log(res);
                    }
                }).catch(err => console.err(err))
        }).catch(err => {
            console.err(err);
        }).finally(() => {
            dbs.close();
        });
});