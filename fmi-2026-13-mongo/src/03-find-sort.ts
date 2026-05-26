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
import { Post } from './model/post';

const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'fmi-2025-intro';
const collection = 'posts';

(async () => {
    // connect to mongodb
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(dbName);

    try {
        // get all posts
        const posts = await db.collection(collection)
            .find<Post>({title:/react/i})
            .project<{title: string, tags: string[]}>({title: true, tags: true})
            .sort({title: -1})
            // .skip(1)
            // .limit(3)
            .toArray();

        // const posts = await db.collection(collection)
        //     .aggregate<Post>(
        //         [{ "$match": { "title": { $regex: /react/i } } },
        //         {
        //             $group: {
        //                 _id: { title: '$title' },
        //                 title: { $addToSet: '$title' },
        //                 count: { "$sum": 1 }
        //             }
        //         }
        //         ])
        //     .toArray();

        posts.forEach(post => console.log(post));

    } catch (err) {
        console.error(err);
    } finally {
        console.log('Finishing demo ...');
        con.close();
    }
})(); //IIFE

