import React from 'react';

const Topic = ({ match, topics }) => {
    console.log(topics);
    console.log(match.params.topicTile);
    return (
    <article>
        <h3>{match.params.topicTile}</h3>
        <div>{topics.find(t => t.title === match.params.topicTile).content}</div>
    </article>);
}

export default Topic;