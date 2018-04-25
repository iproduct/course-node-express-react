import React from 'react';
import { Link, Route } from 'react-router-dom';
import './Topics.css';

const Topics = ({ match, location, history, topics }) => (
    <div>
        <h2>Blog Topics</h2>
        <nav className="Topics-nav">
            <ul> 
                { topics.map(topic => (
                    <li key={topic.title}>
                        <Link to={`${match.url}/${topic.title}`}>{topic.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
        <Route path={`${match.url}/:topicTile`} render={({ match }) => {
            console.log(topics);
            console.log(match.params.topicTile);
            return (
            <article>
                <h3>{match.params.topicTile}</h3>
                <div>{topics.find(t => t.title === match.params.topicTile).content}</div>
            </article>);
        }} />
    </div>
);

export default Topics;