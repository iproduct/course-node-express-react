import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import PostList from './PostList';
import mockPosts from './mock-posts';
import Header from './Header';
import Footer from './Footer';
import { useHistory, Switch, Route } from 'react-router-dom';
import BlogAPI from "./BlogAPI";
import PostForm from "./PostForm";
import Register from "./Register";
import Login from "./Login";

const GOOLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';

function App() {
    const history = useHistory();
    const [posts, setPosts] = useState(mockPosts);
    const [selectedPost, setSelectedPost] = useState(undefined);
    const [favs, setFavs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState(undefined);    
    const [redirectUri, setRedirectUri] = useState(undefined);

    useEffect(() => {
        BlogAPI.findAllPosts()
            .then(posts => setPosts(posts));
        // return () => { console.log("Cleaning up ...")};
    }, []);
    return (
        <React.Fragment>
            <Nav searchPosts={onSearchPosts} loggedUser={loggedUser} />
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <Switch>
                        <Route path="/about">
                            <Header titleText="Bookmark your favourite posts to read them later."
                                buttonText="Get Started" buttonLink="/" />
                            <div className="row center">
                                <img src="/img/reading.png" alt="post reading" className="App-about" />
                            </div>
                        </Route>
                        <Route path="/add-post" component={() => <PostForm onSubmitPost={addEditPost} />} />
                        <Route path="/edit-post">
                            <PostForm master={selectedPost} onSubmitPost={addEditPost} />
                        </Route>
                        <Route path="/users">Users</Route>
                        <Route path="/login"><Login onLogin={login} /></Route>
                        <Route path="/register"><Register onRegister={registerUser} /></Route>
                        <Route path="/favs">
                            <Header titleText="Your favourite posts" buttonText="View All Posts" buttonLink="/" />
                            <PostList showFavs={true} posts={posts} favs={favs} addToFavs={addToFavs}
                                removeFromFavs={removeFromFavs} />
                        </Route>
                        <Route exact path="/">
                            <Header titleText="Bookmark your favourite posts" buttonText="View Favourites"
                                buttonLink="/favs" />
                            <PostList showFavs={false} posts={posts} favs={favs} addToFavs={addToFavs}
                                removeFromFavs={removeFromFavs} editPost={editPost} deletePost={deletePost} />
                        </Route>
                    </Switch>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );

    async function onSearchPosts(searchText) {
        const postsResp = await fetch(
            GOOLE_BOOKS_API_BASE + encodeURIComponent(searchText)
        );
        const postsFound = await postsResp.json();
        console.log(postsFound.items);
        setPosts(
            postsFound.items.map(gpost => ({
                id: gpost.id,
                title: gpost.volumeInfo.title,
                content: gpost.volumeInfo.subtitle,
                imageUrl:
                    gpost.volumeInfo.imageLinks && gpost.volumeInfo.imageLinks.thumbnail
            }))
        );
    }

    function addEditPost(post) {
        console.log(post);
        if (post.id) {
            BlogAPI.updatePost(post).then(updated => {
                setPosts(oldPosts => oldPosts.map(p => p.id === updated.id ? updated : p));
                window.M.toast({html: `<div>Post '${updated.title}' has been updated successfully.</div>`, classes: 'success', displayLength: 8000});
                history.push('/');
            }).catch(error => {
                window.M.toast({ html: '<div>' + error + '</div>', classes: 'error', displayLength: 12000 });
            });
        } else {
            BlogAPI.createPost(post).then(created => {
                setPosts(oldPosts => [...oldPosts, created]);
                window.M.toast({html: `<div>Post '${created.title}' has been created successfully.</div>`, classes: 'success', displayLength: 8000});
                history.push('/');
            }).catch(error => {
                window.M.toast({ html: '<div>' + error + '</div>', classes: 'error', displayLength: 12000 });
            });
        }
    }

    function editPost(post) {
        setSelectedPost(post);
        console.log(post);
        if(!BlogAPI.token) {
            setRedirectUri('/edit-post');
            history.push('/login');
        } else {
            history.push('/edit-post');
        }
    }

    function deletePost(post) {
        console.log(post);
        BlogAPI.deletePostById(post.id).then(deleted => {
            setPosts(oldPosts => oldPosts.filter(p => p.id !== deleted.id));
            window.M.toast({html: `<div>Post '${deleted.title}' has been deleted successfully.</div>`, classes: 'success', displayLength: 8000});
        }).catch(error => {
            window.M.toast({ html: '<div>' + error + '</div>', classes: 'error', displayLength: 12000 });
        });
    }

    function registerUser(user) {
        console.log(user);
        BlogAPI.register(user).then(created => {
            setUsers(oldUsers => [...oldUsers, created]);
            history.push('/');
            window.M.toast({html: `<div>User ${created.firstName} ${created.lastName} has been created successfully.</div>`, classes: 'success', displayLength: 8000});
        }).catch(error => {
            window.M.toast({ html: '<div>' + error + '</div>', classes: 'error', displayLength: 12000 });
        });
    }

    function login(credentials) {
        console.log(credentials);
        BlogAPI.login(credentials)
        .then(loginResp => {
                setLoggedUser(loginResp);
                sessionStorage.setItem('loginResp', loginResp.jwt);
                if(redirectUri){
                    history.push(redirectUri);
                } else {
                    history.push('/');
                }
               
        }).catch(error => {
            window.M.toast({html: '<div>' + error + '</div>', classes: 'error', displayLength: 12000});
        });
    }

    function addToFavs(post) {
        setFavs([...favs, post]);
    }

    function removeFromFavs(post) {
        setFavs(favs.filter(fav => fav.id !== post.id));
    }
}

export default App;
