
import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import './Article.css';

function Article({article, editCallback, ...props}) {
  return (
    <Row className="article-item">
    <Card className="blue-grey darken-1" textClassName="white-text" title={article.title} onClick={editCallback}>
    <Row>
        <Col s={3}>
        {article.imageUrl && 
            (<img className="Article-blog-picture" src={article.imageUrl} alt={article.title}></img>) }
        </Col>
        <Col s={9}>
            {article.content}
        </Col>
    </Row>
    </Card>
    </Row>
  );
}

export default Article;