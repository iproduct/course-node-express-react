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

import './App.css';

import React, { useEffect, useState } from 'react';

import Nav from '../components/Nav/Nav';
import { PostList } from '../components/PostList/PostList';
import { Post } from '../model/post.model';
import PostService from '../service/post-service';
import { PostForm } from '../components/PostForm/PostForm';
import {Route, Redirect, useHistory } from 'react-router-dom';
import type { PostCallback, StringCallback } from '../shared/shared-types';
import { Routes } from 'react-router';

// import MOCK_POSTS from './model/mock-posts';
export interface PostAction {
  type: string;
  post: Post;
}

// function postsReducer(state: Post[], action: PostAction) {
//   switch (action.type) {
//     case 'add':
//       return [...state, action.post];
//     // ... other actions ...
//     default:
//       return state;
//   }
// }


function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const history = useHistory();

  useEffect(() => {
    PostService.getAllPosts().then(
      posts => setPosts(posts)
    );
  }, []);

  // const [posts, dispatch] = useReducer(postsReducer, []);
  // useEffect(() => MOCK_BOOKS.forEach(
  //   (post, index) => setTimeout(dispatch, index*2000, {type: 'add', post: post as Post})),
  //   []); //on mount only


  const handleSearch: StringCallback = async () => {
    // const foundPosts = await PostService.loadPosts(searchText.split(/[\s,;]+/));
    // console.log(foundPosts);
    // setPosts(foundPosts);
  };


  const handleEditPost: PostCallback = (post) => {
    history.push(`/edit-post/${post.id}`);
  };

  const handleDeletePost: PostCallback = (post) => {
    PostService.deletePost(post.id).then(
      deleted => {
        setPosts(posts.filter(p => p.id !== deleted.id));
        history.push('/posts');
      }
    );
  };


  return (
    <React.Fragment>
      <Nav onSearchPosts={handleSearch} />
      <div className="section no-pad-bot" id="index-banner">
        <div className="container" >
          <Routes>
            <Route  path="/">
              <Redirect to="/posts" />
            </Route>
            <Route path="/posts">
              <PostList posts={posts} onEditPost={handleEditPost} onDeletePost={handleDeletePost} />
            </Route>
            <Route path="/add-post">
              <PostForm />
            </Route>
            <Route path="/edit-post/:postId">
              <PostForm  />
            </Route>
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}




export default App;
