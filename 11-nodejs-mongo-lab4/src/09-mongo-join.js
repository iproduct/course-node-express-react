const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, con) {
    if (err) throw err;
    const db = con.db('myblog9');
    db.collection('posts').aggregate([
        {
            $lookup:
            {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'authordetails'
            }
        }
    ]).toArray()
        .then(res => {
            res.forEach(post => console.log(JSON.stringify(post)));
        }).catch(err => {
            console.log("Error: Update unsuccessfull.")
        }).finally(() => {
            con.close();
        })

});