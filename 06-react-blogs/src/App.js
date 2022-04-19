import { useEffect, useState } from 'react';
import './App.css';
import BlogsClient from './service/blogs-api-client';
import Footer from './component/Footer';
import DefaultView from './component/DefaultView';
import Main from './component/Main';
import Nav from './component/Nav';
import PostForm, { ADD } from './component/PostForm';
import TimedMessages, { ERROR } from './component/TimedMessages';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserForm from './component/UserForm';
import PostsMain from './component/PostsMain';
import Post from './component/Post';
import PostDetail from './component/PostDetail';


function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState();
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => BlogsClient.fetchPosts()
    .then(results => {
      setPosts(results)
      clearMessagesAndErors()
    })
    .catch(err => {
      clearMessagesAndErors();
      setErrors(err);
    })
    , [])

  function clearMessagesAndErors() {
    setMessages(undefined);
    setErrors(undefined);
  }

  function handleSubmitPost(post) {
    if (!post.id) { // add post
      BlogsClient.postNewPost(post)
        .then(created => {
          setPosts([...posts, created])
          clearMessagesAndErors();
          setMessages(`New Post created successfully: ${created.id}: '${created.title}'`)
          navigate(`/posts/${created.id}`, { replace: true })
        }).catch(err => {
          clearMessagesAndErors();
          setErrors(err);
        })
    } else { // edit post
      BlogsClient.editPost(post)
        .then(updated => {
          setPosts([...posts, updated])
          clearMessagesAndErors();
          setMessages(`New Post updated successfully: ${updated.id}: '${updated.title}'`)
          navigate(`/posts/${updated.id}`, { replace: true })
        }).catch(err => {
          clearMessagesAndErors();
          setErrors(err);
        })
    }
  }
  function handleDeletePost(toDelete) {
    BlogsClient.deletePostById(toDelete.id)
      .then(() => {
        setPosts(posts.filter(p => p.id !== toDelete.id))
        clearMessagesAndErors();
        setMessages(`New Post deleted successfully: ${toDelete.id}: '${toDelete.title}'`)
        navigate(`/posts`)
      }).catch(err => {
        clearMessagesAndErors();
        setErrors(err);
      })
  }

  const goBack = () => navigate(-1);

  function handleSubmitUser(user) {
    if (!user.id) {
      BlogsClient.postNewPost(user)
        .then(created => {
          setPosts([...users, created])
          clearMessagesAndErors();
          setMessages(`New User created successfully: ${created.id}: '${created.title}'`)
        }).catch(err => {
          clearMessagesAndErors();
          setErrors(err);
        })
    }
  }
  return (
    <div className="App">
      <Nav />
      <div className="container">
        <TimedMessages messages={messages} timeout={10000} key={messages} />
        <TimedMessages messages={errors} type={ERROR} timeout={10000} key={errors} />
        <Routes>
          <Route path="/" element={<Main posts={posts} />} />
          <Route path="/posts" element={<PostsMain posts={posts} onDelete={handleDeletePost}/>}>
            <Route path="add" element={<PostForm onSubmit={handleSubmitPost} onCancel={goBack} />} />
            <Route path="edit/:postId" element={<PostForm onSubmit={handleSubmitPost} onCancel={goBack} />} />
            <Route path=":postId" element={<PostDetail />} />
          </Route>
          <Route path="/add-post" element={<PostForm onSubmit={handleSubmitPost} />} />
          <Route path="/add-user" element={<UserForm onSubmit={handleSubmitUser} />} />
          <Route path="/about" element={(
            <DefaultView actionButtonText={'Add New Post'} actionLinkTo="/add-post">
              <div>A modern responsive front-end framework based on Material Design</div>
              <header>My Blogs Demo</header>
              <span className="button-text">Add New Blog</span>
            </DefaultView>)} />
          <Route path="*" element={(
            <DefaultView actionButtonText={'Go to All Posts'} actionLinkTo="/">
              <header>Page not found</header>
              <div>This is not the page you are looking for :)</div>
            </DefaultView>)} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
