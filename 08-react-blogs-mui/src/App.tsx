/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useCallback, useState } from 'react';
import { Box, Container, createTheme, Divider, ThemeProvider } from "@mui/material";
import PostList from "./components/PostList";
import { useOnMountAsync } from "./hooks/useOnMount";
import { ApiClient, ApiClientImpl } from "./service/api-client";
import { FilterType, IdType } from "./shared/common-types";
import { Post, PostCreateDTO } from "./model/post";
import { useLoading } from "./hooks/useIsLoading";
import PostForm from "./components/PostForm";

const API_CLIENT: ApiClient<IdType, Post> = new ApiClientImpl<IdType, Post>('posts');


const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: false, // No more ripple, on the whole application 💣!
      },
    },
  },
});;
const theme2 = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
  },
});

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<string | undefined>();
  const [editedPost, setEditedPost] = useState<Post | undefined>();
  const [filter, setFilter] = useState<FilterType>();

  const [isLoading, load] = useLoading<Post[]>();

  useOnMountAsync(async () => {
    try {
      const posts = await load(API_CLIENT.findAll());
      setPosts(posts);
    } catch (err) {
      setErrors('' + err);
    }
  }); // <=> componentDidMount

  const handleUpdatePost = useCallback(async (todo: Post) => {
    try {
      const updated = await API_CLIENT.update(todo);
      setPosts((oldPosts) => oldPosts.map(td => td.id === updated.id ? updated : td));
      setErrors(undefined);
    } catch (err) {
      console.log(err);
      setErrors('' + err);
    }
  }, []);

  const handleDeletePost = async (post: Post) => {
    try {
      await API_CLIENT.deleteById(post.id);
      setPosts(oldPosts => oldPosts.filter(p => p.id !== post.id));
      setErrors(undefined);
    } catch (err) {
      setErrors('' + err);
    }
  }


  const handlePostSubmit = useCallback(
    async (post: Post | PostCreateDTO) => {
      try {
        if ('id' in post && post.id) {// edit mode
          await handleUpdatePost(post);
          setEditedPost(undefined);
        } else { // create mode
          const created = await API_CLIENT.create(post);
          setPosts(oldPosts => oldPosts.concat(created));
          setEditedPost(editedPost ? undefined : new Post(0, '', '', '', 0, []));
          setErrors(undefined);
        }
      } catch (err) {
        setErrors('' + err);
      }
    },
    [editedPost, handleUpdatePost]
  );

  const handlePostEdit = (post: Post) => {
    setEditedPost(post);
  }

  const handleCancel = () => {
    setEditedPost(undefined);
  }

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <h2>Blog Posts MUI Demo</h2>
        {errors && <div css={css`color: red`}>{errors}</div>}
        <PostForm key={editedPost?.id} post={editedPost} onSubmitPost={handlePostSubmit} />
        <Divider variant='middle' sx={{ margin: '30px 0 60px' }} />
        <PostList posts={posts} filter={undefined} isLoading={false}
          onUpdatePost={handleUpdatePost}
          onEditPost={handlePostEdit}
          onDeletePost={handleDeletePost} />
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            padding: theme => theme.spacing(2), // <==> p: 2,
            minWidth: 300,
            border: '1px solid gray'
          }}
        >
          <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
          <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
            98.3 K
          </Box>
          <Box
            sx={{
              color: 'success.dark',
              display: 'inline',
              fontWeight: 'bold',
              mx: 0.5,
              fontSize: 14,
            }}
          >
            +18.77%
          </Box>
          <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
            vs. last week
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

