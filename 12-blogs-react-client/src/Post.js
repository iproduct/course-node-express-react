import React from 'react';
import './Post.css';

export default function Post({ post, inFavs, addToFavs, editPost, deletePost, removeFromFavs, ...rest }) {
  function onAddToFavs() {
    addToFavs && addToFavs(post);
  }
  function onRemoveFromFavs() {
    removeFromFavs && removeFromFavs(post);
  }
  function onEdit() {
    editPost && editPost(post);
  }
  function onDelete() {
    deletePost && deletePost(post);
  }

  return (
    <div className="card-wrapper col s12 l6 Post-card">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator Post-front-image"
            src={post.imageUrl}
            alt="front page"
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {post.title}
            <i className="material-icons right">more_vert</i>
          </span>
          <p className="card-subtitle grey-text text-darken-2">{post.subtitle}</p>

          <div className="card-action Post-card-action">
            {!inFavs && <span className="action-button" onClick={onAddToFavs}>
              Add to Favs
            </span>}
            {inFavs && <span className="action-button" onClick={onRemoveFromFavs}>
              Remove from Favs
            </span>}
            {editPost && <span className="action-button" onClick={onEdit}>
              Edit
            </span>}
            {deletePost && <span className="action-button" onClick={onDelete}>
              Delete
            </span>}
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {post.title}
            <i className="material-icons right">close</i>
          </span>
          <p class="card-subtitle grey-text text-darken-2">{post.subtitle}</p>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}

