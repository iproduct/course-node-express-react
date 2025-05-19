import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, styled, TextField, Typography } from '@mui/material';

import React, { useRef, type ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { submitLogin } from '../../features/auth/authSlice';
import type { UnknownAction } from 'redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router';

export default function Login(): ReactElement {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(submitLogin({
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || ''
    }, navigate) as unknown as UnknownAction);
  }
  
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
    <Container component="div" maxWidth="xs">
      <div >
        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  noValidate onSubmit={login}>
          <TextField
            inputRef={usernameRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            inputRef={passwordRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Sign In
          </Button>
          <Grid container>
            <Item>
              <Link href="#">
                Forgot password?
              </Link>
            </Item>
            <Item>
              <Link href="#" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Item>
          </Grid>
        </form>
      </div>
    </Container>
  );
}