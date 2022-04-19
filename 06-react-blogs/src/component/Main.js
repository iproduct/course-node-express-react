import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostList, { CARDS } from './PostList';
import { TabContainer } from './TabContainer';
import { TabPanel } from './TabPanel';
import UserForm from './UserForm';
import Post from './Post';
// import M from 'materialize-css/dist/js/materialize';

class Main extends Component {
    // componentDidMount() {
    //     const tabElem = document.querySelector(".tabs");
    //     console.log(">>>>", tabElem);
    //     M.Tabs.init(tabElem);
    // }
    render() {
        return (
            <div className="section">
                <div className="row">
                    <TabContainer>
                        <TabPanel id="results" title="All Blogs">
                            <PostList posts={this.props.posts} mode={CARDS} render={
                                (post, rest) => (<Post key={post.id} post={post} {...rest} />)
                            } />
                        </TabPanel>
                        <TabPanel id="favourites" title="Favourite Blogs">Favs</TabPanel>
                        <TabPanel id="users" title="Users"><UserForm onSubmit={data => { console.log(data) }} /></TabPanel>
                        <TabPanel id="settings" title="Blog Settings"><h3>Blog settings here ...</h3></TabPanel>
                    </TabContainer>
                </div>
            </div>
        )
    }
}


Main.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageUrl: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired
    }))
}

export default Main