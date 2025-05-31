import { MongoClient } from 'mongodb';
import { Post } from './model/post';

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'fmi-2025-intro';
const collection = 'posts';

(async () => {
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(dbName);
    const post1 = {
        title: "Learning React",
        content: "A Hands-On Guide to Building Web Applications Using React and Redux, 2nd Edition",
        authorId: "1",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51AFwrzNmdL._SX386_BO1,204,203,200_.jpg",
        tags: [
            "react",
            "javascript",
            "redux",
            "hands-on"
        ]
    };
    try {
        const res = await db.collection(collection).insertOne(post1);
        console.log(res);
        if(res.acknowledged) {
            console.log(`Inserted new document with ID = ${res.insertedId}`);
        }
    } catch(err) {
        console.log(err)
    } finally {
        console.log('Finishing demo ...');
        con.close();
    }
})(); //IIFE