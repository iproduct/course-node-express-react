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

import { Post, IPost } from './post.model';
import { ObjectId } from 'mongodb';
const MOCK_POSTS = [
    {
        "title": "Learning React",
        "text": "A Hands-On Guide to Building Web Applications Using React and Redux, 2nd Edition",
        "authorId": "1",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51AFwrzNmdL._SX386_BO1,204,203,200_.jpg",
        "keywords": [
            "react",
            "javascript",
            "redux",
            "hands-on"
        ]
    },
    {
        "title": "Learning React",
        "text": "**Functional Web Development** with *React* and *Redux*, 1st Edition",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51Q43WRXJzL._SX379_BO1,204,203,200_.jpg",
        "authorId": "1",
        "keywords": [
            "functional",
            "react",
            "redux",
            "javascript"
        ],
        "categories": []
    },
    {
        "title": "Pro React 16",
        "text": "`Best-selling author Adam Freeman explains how to get the most from React. He begins by describing the React architecture and the benefits it offers and then shows you how to use React and its associated tools and libraries in your projects, starting from the nuts and bolts and building up to the most advanced and sophisticated features, going in-depth to give you the knowledge you need.`",
        "authorId": "1",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/411Forn86vL.jpg",
        "keywords": [
            "react",
            "javascript",
            "react16"
        ]
    },
    {
        "title": "New in Spring",
        "text": "Spring is Java framework ...",
        "imageUrl": "https://www.publicdomainpictures.net/pictures/320000/velka/blute-blumen-garten-bluhen-1577191608UTW.jpg",
        "authorId": "1",
        "keywords": [
            "spring",
            "java"
        ],
        "categories": [
            "programming",
            "computers"
        ]
    },
    {
        "title": "New in React: Whats New and Noteworthy",
        "text": "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.  This page describes the APIs for the built-in Hooks in React.  If you’re new to Hooks, you might want to check out the overview first. You may also find useful information in the frequently asked questions section.  Basic Hooks:  \n - useState, \n - useEffect, \n - useContext,\n - useReducer,\n - useDispatch.\n\nThings to remember:\n1. Use latest React version\n2. Know the rules of hooks\n3. Build your custom hooks",
        "imageUrl": "https://www.publicdomainpictures.net/pictures/270000/velka/darknetdark-netdark-webip-addres.jpg",
        "authorId": "1",
        "keywords": [
            "react",
            "hooks",
            "redux"
        ],
        "categories": [
            "programming",
            "computers"
        ]
    },
    {
        "title": "React Refs",
        "text": "Forwarding refs to DOM components\nEConsider a *FancyButton* component that renders the native button *DOM element*:\n\n    function FancyButton(props) {\n      return (\n        <button className=\"FancyButton\">\n          {props.children}\n        </button>\n      );\n    }\n**React components hide their implementation details**, including their rendered output. Other components using FancyButton usually will not need to obtain a ref to the inner button DOM element. This is good because it prevents components from relying on each other’s DOM structure too much.",
        "imageUrl": "https://www.publicdomainpictures.net/pictures/80000/velka/internet-and-multimedia-sharing.jpg",
        "authorId": "1",
        "keywords": [
            "react",
            "refs",
            "components",
            "forward-ref"
        ],
        "categories": [
            "programming"
        ]
    }
] as IPost[];

export default MOCK_POSTS;