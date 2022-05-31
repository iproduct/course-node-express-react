const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, con) {
    if (err) throw err;
    const db = con.db('webstore4');
    db.collection('orders').aggregate([
        {
            $lookup:
            {
                from: 'products',
                localField: 'prod_id',
                foreignField: '_id',
                as: 'productdetails'
            }
        }
    ]).toArray()
        .then(res => {
            res.forEach(order => console.log(JSON.stringify(order)));
        }).catch(err => {
            console.log("Error: Update unsuccessfull.")
        }).finally(() => {
            con.close();
        })

});