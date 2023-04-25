/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useMemo } from "react";
import { FilterType, PostUdateListener } from "../shared/common-types";
import PropTypes from 'prop-types';
import { Post } from "../model/post";
import PostCard from "./PostCard";

type PostListProps = {
    posts: Post[],
    filter: FilterType,
    isLoading: boolean,
    onUpdatePost: PostUdateListener;
    onEditPost: PostUdateListener;
    onDeletePost: PostUdateListener;
}

// export const TodoList = ({ todos }: Props) => {
export const TodoList = ({ posts, filter, isLoading, ...rest }: PostListProps) => {
    const filteredTodos = useMemo(() => posts.filter(todo => filter ? todo.status === filter : true), [posts, filter]);// O(n) => O(1)
    return isLoading ?
        <div>Loadind Data ...</div> :
        <ul className="TodoList"
            css={css`
                display: flex;
                flex-flow: row wrap;
                gap: 20px 20px`
            }>
            {filteredTodos.map(post => (<PostCard key={post.id} post={post} {...rest} />))}
        </ul>
};

export default TodoList;