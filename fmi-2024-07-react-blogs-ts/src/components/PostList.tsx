import React, { useMemo } from 'react'
import { Post, PostFilterType, PostStatus } from '../model/post-model';
import PostItem from './PostItem';


type PostListProps = {
    posts: Post[],
    filter: PostStatus | undefined;
    onDelete: (post: Post) => void;
}

export default function PostList({posts, filter, ...rest}: PostListProps) {
  const visiblePosts = useMemo(
    () => posts.filter(td => !filter || filter === td.status),
    [posts, filter]
  );
  return (
    <div>{
      visiblePosts.map((td, index) => (<PostItem key={td.id} post={td} index={index + 1} {...rest} />))}</div>
  )
}