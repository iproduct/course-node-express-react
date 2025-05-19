/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as React from 'react';
import { Post } from '../../model/post.model';
import type { ReactElement } from 'react';
import { PostItem } from '../PostItem/PostItem';
import type { PostCallback } from '../../shared/shared-types';
import Header from '../Header/Header';
import { Grid } from '@mui/material';

interface Props {
  posts: Post[];
  onEditPost: PostCallback;
  onDeletePost: PostCallback;
}

export function PostList({ posts, ...rest }: Props): ReactElement<Props> {
  return (
    <React.Fragment>
      <Header />
      <Grid container spacing={2}>
        {posts.map(post => (<PostItem post={post} key={post.id} {...rest} />))}
      </Grid>
    </React.Fragment>
  );
};
