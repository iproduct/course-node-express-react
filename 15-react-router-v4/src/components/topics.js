import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import './Topics.css';
import { withParams } from './hocs';
import Topic from './Topic'

const Topics = ({ match, location, history, topics }) => (
    <div className="Topics">
        <h2>Blog Topics</h2>
        <nav className="Topics-nav">
            <ul> 
                { topics.map(topic => (
                    <li key={topic.title}>
                        <NavLink to={`${match.url}/${topic.title}`} 
                            className='navlink' activeClassName='active'>
                            {topic.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
        <Route path={`${match.url}/:topicTile`} render={ withParams(Topic, { topics }) } />
    </div>
);

export default Topics;