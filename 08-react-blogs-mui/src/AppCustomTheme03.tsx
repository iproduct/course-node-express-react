/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { Container } from "@mui/material";

const theme = createTheme({
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
    success: {
      dark: '#009688',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
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

