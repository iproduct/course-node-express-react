import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
//
import POSTS from '../_mocks_/blog';
import BlogPostForm from '../sections/@dashboard/blog/BlogPostForm';
import blogsApiClient from '../service/blogs-api-client'
import { useEffect, useState } from 'react';
import { Post } from '../model/post-model';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function BlogEdit({ ...rest }) {
  const { postId } = useParams();
  const [post, setPost] = useState(new Post());

  useEffect(() => {
    blogsApiClient.fetchPostById(postId).then(post => setPost(post));
  }, [])

  return (
    <Page title="Dashboard: Blog Edit Form | Minimal-UI">
      <Container>
        <BlogPostForm {...rest} key={post.id} post={post} />
      </Container>
    </Page>
  );
}
