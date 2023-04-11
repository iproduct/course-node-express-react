import React from 'react'
import { Post } from '../model/posts';
import './PostItem.css';

type Props = {
    post: Post;
}

const PostItem = ({ post }: Props) => {
    return (
        <div className='PostItem-wrapper col s12 m6 l4'>
            <div className="PostItem-card card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={post.imageUrl} alt={post.title} />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{post.title}<i className="material-icons right">more_vert</i></span>
                    <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{post.title}<i className="material-icons right">close</i></span>
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    )
}

export default PostItem;