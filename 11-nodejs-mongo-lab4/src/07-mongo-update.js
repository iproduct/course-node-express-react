const MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

MongoClient.connect(dbUrl, function (err, con) {
    if (err) throw err;
    const db = con.db('myblog9');
    db.collection('posts')
        .updateOne({ title:/^Pro React/i }, { $set: { title: 'Pro REACT 17 for All' , level: 'intermediate'} })
        .then(res => {
            // console.log(res);
            db.collection('posts')
                .find({ title: /React/i })
                // .project({ title: 1, author: 1 })
                .sort({ title: 1 })
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