import React from 'react';
import './Post.css';

export default function Post({ post, inFavs, addToFavs, removeFromFavs, ...rest }) {
  function onAddToFavs() {
    addToFavs && addToFavs(post);
  }
  function onRemoveFromFavs() {
    removeFromFavs && removeFromFavs(post);
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
          {!inFavs && <div className="card-action Post-card-action" onClick={onAddToFavs}>
            Add to Favs
          </div>}
          {inFavs && <div className="card-action Post-card-action" onClick={onRemoveFromFavs}>
            Remove from Favs
          </div>}
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {post.title}
            <i className="material-icons right">close</i>
          </span>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}

