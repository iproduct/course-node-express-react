import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostList, { COLLECTION } from './PostList';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PostCollectionItem from './PostCollectionItem';
import './PostsMain.css'
// import M from 'materialize-css/dist/js/materialize';

function PostsMain({ posts, ...rest }) {
    return (
        <div className="section">
            <div className="PostMain row">
                <div className="PostMain-left-column">
                    <div className="row center">
                        <Link to="/posts/add" className="PostMain-btn btn-large waves-effect waves-light blue" >
                            Add New Post
                        </Link>
                    </div>
                    <PostList className="PostList" posts={posts} mode={COLLECTION} {...rest} render={
                        (post, rest) => (<PostCollectionItem key={post.id} post={post} {...rest} />)
                    } />
                </div>
                <div className="PostMain-right-column">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


PostsMain.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageUrl: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    }))
}

export default PostsMain