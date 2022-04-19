import PropTypes from 'prop-types';
import { number } from 'yup';
import './PostList.css';

export const CARDS = 0;
export const COLLECTION = 1;

export const Role = ['CARDS', 'COLLECTION'];

const PostList = ({ posts, render, mode, ...rest }) => {
    return (
        <div className={mode === COLLECTION ? "PostList-items collection" : "PostList-items"}>
            {
                posts
                    // .filter(post => post.status === filter || filter === ALL_STATUSES)
                    .map(post => render(post, rest))
            }
        </div>
    );
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageUrl: PropTypes.string,
        authorId: PropTypes.number,
        active: PropTypes.bool
    })),
    mode: PropTypes.number,
    rest: PropTypes.object
}

export default PostList;