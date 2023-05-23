/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { MongoClient } from 'mongodb';
import { Post } from './model/post.model';

const dbUrl = 'mongodb://localhost: 27017/'

MongoClient.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, con) => {
    if (err) throw err;
    const db = con.db('myblog10');
    const post1 = {
        title: "Learning React",
        text: "A Hands-On Guide to Building Web Applications Using React and Redux, 2nd Edition",
        authorId: "1",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51AFwrzNmdL._SX386_BO1,204,203,200_.jpg",
        keywords: [
            "react",
            "javascript",
            "redux",
            "hands-on"
        ]
    }
    try {
        // insert new post     
        const res = await db.collection('posts').insertOne(post1);
        if (res.result.ok && res.insertedCount === 1) {
            console.log(`Inserted new document with ID: ${res.insertedId}.`);
        }

        // get all posts
        const posts = await db.collection('posts').find<Post>().toArray();
        posts.forEach(post => console.log(post));

    } catch (err) {
        console.error(err);
    } finally {
        console.log('Finishing demo...');
        con.close();
    }
})

