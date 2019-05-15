import React, { useState } from 'react';
import ARTICLES from './mock-articles';
import { Row, Col, Card } from 'react-materialize';

function ArticlesList() {
  const [articles, setArticles] = useState(ARTICLES);

  return (
      <div className="articles-main">
        <ul>
            {
                articles.map(article => (
                    <Row key={article.id} className="article-item">
                    <Col m={6} s={12}>
                    <Card
                    className="blue-grey darken-1"
                    textClassName="white-text"
                    title={article.title}
                    >
                    {article.imageUrl && (<img src={article.imageUrl} alt={article.title}></img>) }
                    {article.content}
                    </Card>
                    </Col>
                    </Row>
                ))
            }
        </ul>
        <div>
            <button onClick={() => setArticles(articles)}>
                Add Article
            </button>
        </div>
    </div>
  );
}

export default ArticlesList;