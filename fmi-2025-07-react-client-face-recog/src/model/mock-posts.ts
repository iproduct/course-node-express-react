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

const MOCK_POSTS = [
    {
        _id: '1',
        title: 'React.js Book',
        text: 'Learning React JavaScript Library From Scratch',
        authorId: '1',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51BXdIhEe1L.jpg',
        keywords: ['react', 'javascript']
    },
    {
        _id: '2',
        title: 'Learning React',
        text: 'A Hands-On Guide to Building Web Applications Using React and Redux, 2nd Edition',
        authorId: '1',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51AFwrzNmdL._SX386_BO1,204,203,200_.jpg',
        keywords: ['react', 'javascript', 'redux', 'hands-on']
    },
    {
        _id: '3',
        title: 'Learning React',
        text: 'Functional Web Development with React and Redux, 1st Edition',
        authorId: '1',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Q43WRXJzL._SX379_BO1,204,203,200_.jpg',
        keywords: ['functional', 'react', 'redux', 'javascript']
    },
    {
        _id: '4',
        title: 'Pro React 16',
        text: `Best-selling author Adam Freeman explains how to get the most from React. 
        He begins by describing the React architecture and the benefits it offers and then 
        shows you how to use React and its associated tools and libraries in your projects, 
        starting from the nuts and bolts and building up to the most advanced and sophisticated 
        features, going in-depth to give you the knowledge you need.`,
        authorId: '1',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/411Forn86vL.jpg',
        keywords: ['react', 'javascript', 'react16']
    },
]

export default MOCK_POSTS;