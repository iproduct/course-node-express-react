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

import { MongoClient, ObjectId } from 'mongodb';
import { Post } from './model/post';

const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'fmi-2025-intro';
const collection = 'posts';

(async () => {
    // connect to mongodb
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(dbName);
    const postId = '683b3f6424dd9d3a94161655';
    try {
        // update by _id
        var myquery = { _id: new ObjectId(postId) };
        var newvalues = { $set: {title: "Pro React - Forth Edition", categories: ['frontend']} };
        const updateRes = await db.collection(collection)
            .updateOne(myquery, newvalues)
        console.log(updateRes);
        if (updateRes.acknowledged) {
            console.log(`${updateRes.modifiedCount} documents successfully updated document with ID: ${postId}.`);
        }

        // get all posts
        const posts = await db.collection(collection)
            .find<Post>({title:/react/i})
            .sort({title: 1})
            .toArray();
       
        posts.forEach(post => console.log(post));

    } catch (err) {
        console.error(err);
    } finally {
        con.close();
        return 'Finishing demo...';
    }
})();
