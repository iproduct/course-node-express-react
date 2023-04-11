import React from 'react'
import { Post } from '../model/posts';
import PostItem from './PostItem';

type Props = {
    posts: Post[]
}

const PostsList = ({ posts }: Props) => {
    return (
        <div className='PostsList-posts'>
            {posts.map(post => (<PostItem post={post}/>))}
        </div>
    )
}

export default PostsList;