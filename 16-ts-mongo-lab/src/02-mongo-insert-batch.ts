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
import { Post, IPost } from './model/post.model';
import MOCK_POSTS from './model/mock-posts';

const dbUrl = 'mongodb://localhost: 27017/'
const collection = 'posts';

async function main() {
    // connect to mongodb
    const con = await MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    const db = con.db('myblog10');
    
    try {
        // clean db
        const dropRes = await db.collection(collection).drop();
        console.log(`Dropped collection "${collection}": ${dropRes}`);

        // insert new post     
        const insRes = await db.collection<IPost>(collection).insertMany(MOCK_POSTS);
            
        if (insRes.result.ok && insRes.insertedCount === MOCK_POSTS.length) {
            console.log(`Inserted new document with ID: ${JSON.stringify(insRes.insertedIds)}.`);
        }

        // get all posts
        const posts = await db.collection(collection).find<Post>().toArray();
        posts.forEach(post => console.log(post));

    } catch (err) {
        console.error(err);
    } finally {
        con.close();
        return 'Finishing demo...';
    }
}

// run the demo
main().then(result => console.log(result));
