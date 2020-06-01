import React from 'react';
import Post from './Post';

const PostList = ({ showFavs, posts, favs, ...rest }) => {
  let postsToShow;
  let inFavs;
  if(showFavs) {
    postsToShow = favs;
    inFavs = (post) => true;
  } else {
    postsToShow = posts;
    inFavs = (post) => favs.some(fav => fav.id === post.id);
  }
  
  return (
      <div className="section">
        <div className="row">
          {postsToShow.map(post => (
            <Post post={post} key={post.id} inFavs={inFavs(post)} {...rest}/>
          ))}
        </div>
      </div>
  );
};

export default PostList;
