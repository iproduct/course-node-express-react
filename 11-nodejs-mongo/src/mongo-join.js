const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, con) {
    if (err) throw err;
    const db = con.db('webstore2');
    db.collection('orders').aggregate([
        {
            $lookup:
            {
                from: 'products',
                localField: 'prod_id',
                foreignField: '_id',
                as: 'orderdetails'
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