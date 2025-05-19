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
import './PictureItem.css';
import type { PostCallback } from '../../shared/shared-types';
import { Marked, Renderer } from '@ts-stack/markdown';
import { Card, CardMedia, ButtonBase, CardContent, Typography, Chip, CardActions, IconButton, Collapse, styled, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import clsx from 'clsx';

interface Props {
  picture: Post;
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



//   postItemSubtitle: {
//     padiing: 0,
//     lineHeight: '1.5em',
//     maxHeight: '5em',
//     overflow: 'hidden',
//   },
//   postItemTags: {
//     display: 'flex',
//     maxHeight: '20px',
//     justifyContent: 'start',
//     flexWrap: 'nowrap',
//     '& > *': {
//       margin: theme.spacing(0.5),
//     },
//   },
//   category: {
//     marginTop: 0,
//     backgroundColor: '#26a69a',
//     transition: 'background-color .3s',
//     color: 'white',
//     '&:hover': {
//       backgroundColor: '#11ddc9',
//       transition: 'background-color .3s',
//     }
//   },
//   keyword: {
//     marginTop: 0,
//     backgroundColor: '#979797',
//     transition: 'background-color .3s',
//     color: 'white',
//     '&:hover': {
//       backgroundColor: '#616161',
//       transition: 'background-color .3s',
//     }
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   collapse: {
//     overflow: 'auto',
//   },
//   collapseEntered: {
//     height: '380px',
//   },

//   collapseContent: {

//   },
//   cardActions: {
//     position: 'absolute',
//     bottom: 0,
//     display: 'flex',
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//     width: '100%',
//   },
//   actionButtons: {},
// }));

export const PictureItem: React.FC<Props> = ({ picture, onEditPost, onDeletePost }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () => {
    onEditPost(picture);
  }
  const handleDelete = () => {
    onDeletePost(picture);
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
      <Card sx={{
        padding: '10px',
        height: '450px',
        position: 'relative',
        '& .PostItem-card-content': {
          paddingTop: '10px',
          width: '100 %',
          maxHeight: '180px',
          overflow: 'hidden',
          '& p': {
            lineHeight: '1.5rem',
            maxHeight: '4.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: 0,
            margin: 0,
          }
        }
      }}>
        <Collapse className={classes.collapse} in={expanded} timeout="auto" unmountOnExit classes={{ wrapper: classes.collapseEntered }} >
          <CardContent className={classes.collapseContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {picture.title}
            </Typography>
            <Typography paragraph dangerouslySetInnerHTML={rawMarkup(picture.text)} />
          </CardContent>
        </Collapse>
        <ButtonBase>
          <CardMedia component="img" image={picture.imageUrl ? picture.imageUrl : '/img/no-image.png'} title="Blog" sx={{
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '80 %',
            height: '240px',
            margin: 'auto',
            '& img.PostItem-image': {
              height: '180px',
              margin: 'auto',
              padding: 0
            }
          }} />
        </ButtonBase>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {picture.title}
          </Typography>
          <div className={classes.postItemTags}>
            {picture.categories?.map((cat, index) => (
              <Chip key={index} className={classes.category} size="small" label={cat} />
            ))}
            {picture.keywords?.map((kword, index) => (
              <Chip key={index + 1000} className={classes.keyword} size="small" label={kword} />
            ))}
          </div>
          <Typography className={classes.postItemSubtitle} variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={rawMarkup(picture.text)} />
        </CardContent>

        <CardActions className={classes.cardActions} disableSpacing>
          <a href="posts?remove={{.ID}}">Add to Favs</a>
          <div className={classes.actionButtons}>
            <IconButton color="primary" title="EDIT Post" onClick={handleEdit} component="button">
              <CreateIcon />
            </IconButton>
            <IconButton color="secondary" title="DELETE Post" onClick={handleDelete} component="button">
              <DeleteIcon />
            </IconButton>
            <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </Item >
  );
};
