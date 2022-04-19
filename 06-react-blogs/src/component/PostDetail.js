import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { useParams } from 'react-router-dom';
import './PostDetail.css';
import blogsApiClient from '../service/blogs-api-client';
import {Post} from '../model/post-model';

const PostDetail = ({onError}) => {
    let { postId } = useParams();
    const [post, setPost] = useState(new Post())
    useEffect(() => {blogsApiClient.fetchPostById(postId)
        .then(post => setPost(post))
        .catch(err => onError(err))
    }, [postId, onError]);
    return (
        <div className="PostDetail-card-wrapper col s12 m12">
            <div className="PostDetail-card card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="PostDetail-image activator responsive-img" src={post.imageUrl ? post.imageUrl : "images/office.jpg"} alt="Blog" />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{post.title}<i className="material-icons right">more_vert</i></span>
                    <p><a href="#">{post.tags.join(', ')}</a></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{post.title}<i className="material-icons right">close</i></span>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

PostDetail.propTypes = {}

export default PostDetail