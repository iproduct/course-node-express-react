import React, { useMemo } from 'react'
import { NavLink, Path, useSearchParams } from 'react-router-dom';
import { FilterType, Post } from '../model/posts';
import { PostListener } from '../model/shared-types';
import ErrorBoundary from '../util/ErrorBoundary';
import './PostList.css'

interface PostListProps {
    posts: Post[];
    filter: FilterType;
    onDeletePost: PostListener;
    onEditPost: PostListener;
}

function PostList({ posts, filter, ...rest }: PostListProps) {
    const filteredPosts = useMemo(
        () => posts.filter(post => !filter ? true : post.status === filter),
        [posts, filter]);
    console.log('Render PostList')
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className='PostList'>
            {filteredPosts.map(post => (<ErrorBoundary key={post.id}>
                <NavLink to={{pathname: `/posts/${post?.id}`, search: searchParams.toString()}} relative="path">
                    {({ isActive }) => (
                        <span
                            className={
                                isActive ? 'active' : undefined
                            }
                        >
                            {post.title}
                        </span>
                    )}
                </NavLink>
            </ErrorBoundary>)
            )}
        </div>
    )
}

export default React.memo(PostList);
