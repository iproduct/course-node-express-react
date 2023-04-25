/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import './App.css';
import { css } from "@emotion/react";
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Button 
      variant="contained"
      css={css`
          background-color: green;

          :hover {
            background-color: red;
          }
        `}
      >Hello World</Button>
      </header>
    </div>
  );
}

export default App;
