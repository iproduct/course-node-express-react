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
import './PostItem.css';
import { Marked, Renderer } from '@ts-stack/markdown';
import { Card, CardMedia, ButtonBase, CardContent, Typography, Chip, CardActions, IconButton, Collapse, styled, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import type { PostCallback } from '../../shared/shared-types';

interface Props {
  post: Post;
  onEditPost: PostCallback;
  onDeletePost: PostCallback;
}

Marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

const rawMarkup = (markdownText: string) => (
  { __html: Marked.parse(markdownText) }
);

export const PostItem: React.FC<Props> = ({ post, onEditPost, onDeletePost }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () => {
    onEditPost(post);
  }
  const handleDelete = () => {
    onDeletePost(post);
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
    <Item>
      <Card >
        <Collapse   timeout="auto" unmountOnExit  >
          <CardContent >
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography paragraph dangerouslySetInnerHTML={rawMarkup(post.text)} />
          </CardContent>
        </Collapse>
        <ButtonBase>
          <CardMedia  component="img" image={post.imageUrl ? post.imageUrl : '/img/no-image.png'} title="Blog" />
        </ButtonBase>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <div>
            {post.categories?.map((cat, index) => (
              <Chip key={index} size="small" label={cat} />
            ))}
            {post.keywords?.map((kword, index) => (
              <Chip key={index + 1000} size="small" label={kword} />
            ))}
          </div>
          <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={rawMarkup(post.text)} />
        </CardContent>

        <CardActions disableSpacing>
          <a href="posts?remove={{.ID}}">Add to Favs</a>
          <div>
            <IconButton color="primary" title="EDIT Post" onClick={handleEdit} component="button">
              <CreateIcon />
            </IconButton>
            <IconButton color="secondary" title="DELETE Post" onClick={handleDelete} component="button">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </Item>
  );
};
