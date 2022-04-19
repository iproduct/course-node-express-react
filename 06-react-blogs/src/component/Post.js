import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const Post = ({ post }) => {
    return (
        <div className="Post-card-wrapper col s12 m4">
            <div className="Post-card card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="Post-image activator responsive-img" src={post.imageUrl ? post.imageUrl : "images/office.jpg"} alt="Blog" />
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

Post.propTypes = {}

export default Post