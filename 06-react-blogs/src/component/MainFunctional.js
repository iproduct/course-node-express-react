import React, { useEffect, useState } from 'react';
import BlogsClient from '../service/blogs-api-client';
import PropTypes from 'prop-types';
import PostList from './PostList';
import { TabContainer } from './TabContainer';
import { TabPanel } from './TabPanel';

const Main = props => {
    const [blogs, setBlogs] = useState([]);
    const [messages, setMessages] = useState();
    const [errors, setErrors] = useState();
    function clearMessagesAndErors() {
        setMessages(undefined);
        setErrors(undefined);
    }
    useEffect(() => {
        BlogsClient.fetchPosts()
            .then(results => {
                setBlogs(results)
                clearMessagesAndErors()
            })
            .catch(err => {
                setErrors(err)
            });
    }, [])
    return (
        <div className="container">
            <div className="section">
                <div className="messages">{messages}</div>
                <div className="errors">{errors}</div>
                <div className="row">
                    <TabContainer>
                        <TabPanel id="results" title="All Blogs"> <PostList posts={blogs} /></TabPanel>
                        <TabPanel id="favourites" title="Favourite Blogs">Test 2 content ...</TabPanel>
                        <TabPanel id="settings" title="Blog Settings">Blog settings here ...</TabPanel>
                    </TabContainer>
                </div>
            </div>
        </div>
    )
}

Main.propTypes = {}

export default Main