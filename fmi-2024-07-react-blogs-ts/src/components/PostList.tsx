import React, { useMemo } from 'react'
import { Post, PostStatus } from './post-model'
import PostItem from './PostItem'
import { PostFilterType } from './PostFilter';

type PostListProps = {
    posts: Post[],
    filter: PostStatus | undefined;
    onDelete: (post: Post) => void;
}

export default function PostList({posts, filter, ...rest}: PostListProps) {
  const visiblePosts = useMemo(
    () => ((tds: Post[] , fltr: PostFilterType) => posts.filter(td => !filter || filter === td.status)),
    [posts, filter]
  );
  return (
    <div>{
      visiblePosts(posts, filter).map((td, index) => (<PostItem key={td.id} post={td} index={index + 1} {...rest} />))}</div>
  )
}