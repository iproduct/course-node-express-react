import React from 'react';
import PropTypes from 'prop-types';
import './PostCollectionItem.css';
import { NavLink, useNavigate } from 'react-router-dom';


const PostCollectionItem = ({ post, onDelete }) => {
    const navigate = useNavigate();
    const navigateEditPost = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`edit/${post.id}`);
    }
    const deletePost = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onDelete(post);
    }

    return (
        <NavLink to={"/posts/" + post.id} className={({ isActive }) => isActive ? "active" : undefined}>
            <div className="PostCollectionItem collection-item avatar hoverable">
                <img src={post.imageUrl ? post.imageUrl : "images/office.jpg"} alt="Blog post" className="PostCollectionItem-img circle" />
                <span className="title">{post.title}</span>
                <p>{post.tags.join(', ')}</p>
                <div className='PostCollectionItem-buttons secondary-content PostForm-button-panel'>
                    <div className="btn waves-effect waves-light" onClick={navigateEditPost}>
                        <i className="material-icons right">edit</i>
                    </div>
                    <div className="btn waves-effect waves-light #ff1744 red accent-3" onClick={deletePost}>
                        <i className="material-icons right">cancel</i>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

PostCollectionItem.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageUrl: PropTypes.string,
        authorId: PropTypes.number,
        active: PropTypes.bool
    }),
    onDelete: PropTypes.func.isRequired,
}

export default PostCollectionItem