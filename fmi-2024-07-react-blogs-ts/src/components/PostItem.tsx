import React from 'react'
import { Post, PostStatus } from '../model/post-model';

type PostitemProps = {
    post: Post;
    index: number;
    onDelete: (post: Post) => void;
}

const PostItem = ({ post, index, onDelete }: PostitemProps) => {
    return (
        <div key={post.id} className="card my-1 d-flex flex-row justify-content-between">
            <span className="btn-group">
                <span className="btn btn-primary">{index}</span>
                <span className="btn btn-default">{post.title}</span>
            </span>
            <span className="align-items-center justify-content-between">
                <span className="badge  bg-secondary py-2 ms-2">{PostStatus[post.status]}</span>
                <span className="btn btn-danger ms-2" onClick={(event) => {onDelete(post)}}>Del</span>
            </span>
        </div>
    )
}

export default PostItem