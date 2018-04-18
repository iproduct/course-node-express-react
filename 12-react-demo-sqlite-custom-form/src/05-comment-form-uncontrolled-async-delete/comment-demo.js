import React from 'react';
import {render} from 'react-dom';
import CommentBox from "./comment-box";

const app = document.getElementById('app');
render(<CommentBox url="/api/comments" pollInterval={50000} />, app);
