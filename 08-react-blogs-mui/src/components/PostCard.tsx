import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Post } from '../model/post';
import { getSummary } from '../shared/utils';
import { CARD_CONTENT_HEIGHT, CARD_CONTENT_WIDTH, MAX_SUMMARY_LENGTH } from '../shared/constants';
import { Box } from '@mui/material';
import { PostUdateListener } from '../shared/common-types';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(({ expand, ...other }: ExpandMoreProps) => <IconButton {...other} />)
  (({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

interface PostCardProps {
  post: Post;
  onUpdatePost: PostUdateListener;
  onEditPost: PostUdateListener;
  onDeletePost: PostUdateListener;
}

export default function PostCard({ post, onUpdatePost, onEditPost, onDeletePost }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: CARD_CONTENT_WIDTH }}>
      <Box sx={{ height: CARD_CONTENT_HEIGHT }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={post.tags.join(', ')}
        />
        <CardMedia
          component="img"
          height="194"
          // image={paellaImage}
          image={post.imageUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {getSummary(post.content, MAX_SUMMARY_LENGTH)}
          </Typography>
        </CardContent>
      </Box>

      <CardActions disableSpacing>
        <IconButton aria-label="edit post" onClick={() => onEditPost(post)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="edit post" onClick={() => onDeletePost(post)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
