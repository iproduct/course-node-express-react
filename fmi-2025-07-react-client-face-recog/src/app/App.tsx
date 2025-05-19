/* eslint-disable @typescript-eslint/no-unused-vars */
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

// import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../components/Alert/Alert';
import { PostForm } from '../components/PostForm/PostForm';
import { PostList } from '../components/PostList/PostList';
import { deletePost, fetchPosts } from '../features/posts/postsSlice';
import { mainListItems, secondaryListItems } from '../listitems';
import type { PostCallback } from '../shared/shared-types';
import type { RootState } from './rootReducer';
import Login from '../components/Login/Login';

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import { FaceRecognition } from '../components/FaceRecognition/FaceRecognition';
import { AppBar, Badge, Container, createTheme, CssBaseline, Divider, Drawer, Grid, IconButton, Link, List, Paper, styled, Toolbar, Typography } from '@mui/material';
import type { UnknownAction } from 'redux';
import { Route, Routes, useNavigate } from 'react-router';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/iproduct">
        Trayan Iliev, IPT - Intellectual Products &amp; Technologies
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = createTheme({
  components:
  {
    MuiToolbar: {
      styleOverrides: {
      }
    }
  }
})


export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts() as unknown as UnknownAction);
  }, [dispatch]);

  const posts = useSelector((state: RootState) => state.posts.posts);

  const errors = useSelector((state: RootState) => {
    return state.resources.error;
  });
  const messages = useSelector((state: RootState) => {
    return state.resources.message;
  });

  const loggedUser = useSelector((state: RootState) => {
    return state.auth.loggedUser;
  });




  const handleEditPost: PostCallback = (post) => {
    navigate(`/edit-post/${post.id}`);
  };

  const handleDeletePost: PostCallback = (post) => {
    dispatch(deletePost(post.id) as unknown as UnknownAction);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap >
            Dashboard
          </Typography>
          {loggedUser && <Typography component="h1" variant="h6" color="inherit" noWrap >
            Welcome, {loggedUser.firstName}
          </Typography>}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List >{mainListItems}</List>
        <Divider />
        <List >{secondaryListItems}</List>
      </Drawer>

      <main>
        <div />
        <Container maxWidth="lg" >
          <Routes>
            <Route index element={<FaceRecognition />} />
            <Route path="/face-recognition" element={<FaceRecognition />} />
            <Route path="/posts" element={<PostList posts={posts} onEditPost={handleEditPost} onDeletePost={handleDeletePost} />} />
            <Route path="/edit-post/:postId"  element={<PostForm />} />
            <Route path="/login"  element={<Login />} />
          </Routes>
          <Grid container spacing={3}>
            {/* Chart */}
            <Item >
              
                {/* <Chart />*/}
              
            </Item>
            {/* Recent Deposits */}
            <Item >
              
                {/* <Deposits /> */}
              
            </Item>
            {/* Recent Orders */}
            <Item>
             
                {/* <Orders /> */}
             
            </Item>
          </Grid>
          <Item >
            <Copyright />
          </Item>
        </Container>
      </main>
      {errors && (<Alert key={errors} severity="error">{errors}</Alert>)}
      {messages && (<Alert key={messages} severity="success">{messages}</Alert>)}
    </div>
  );
}