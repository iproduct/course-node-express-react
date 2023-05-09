import React, { useEffect, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PostList from '../components/PostList'
import { Post } from '../model/posts'
import { PostsApi } from '../service/rest-api-client'

export const PostsPage = () => {
    // const [posts, setPosts] = useState<Post[]>([])
    // useEffect(() => {
    //     PostsApi.findAll().then(posts => {
    //         setPosts(posts)
    //     })
    // }, [])
    const posts = useLoaderData() as Post[];
    
    return (
        <>
            <PostList posts={posts} filter={undefined} onDeletePost={() => { }} onEditPost={() => { }} />
            <div className="PostsPage-article">
                <Outlet />
            </div>
        </>
    )
}
