import React, { useState } from 'react';
import ARTICLES from './mock-articles';
import { Row, Col, Button, Icon } from 'react-materialize';
import Article from './Article';
import ArticleForm from './ArticleForm';

class ArticlesList extends React.Component {
    state = {
        articles: ARTICLES,
        showAddForm: false,
        editMode: true
    }

    // const [articles, setArticles] = useState(ARTICLES);
    // const [showAddForm, setShowAddForm] = useState(false);
    // const [editMode, setEditMode] = useState(true);

    setArticle = (article) => {
        if(this.state.editMode) {
            this.setState(s =>({
                    articles: s.articles.map(a => (a.id === article.id ? article : a ))
            }));
        } else {
            article.id = '' + Date.now();
            console.log(article);
            this.setState(s => ({
                    articles: [...s.articles, article]
                })
            );
        }
    }

    render() {
        return (
            <Row className="articles-main">
                <Col s={12} m={4}>
                {
                    this.state.articles.map(article => (
                        <Article key={article.id} article={article} />
                    ))
                }
                </Col>
                <Col s={12} m={4}>
                <div>
                    <Button waves="light" onClick={() => {
                        this.setState({showAddForm : true}); 
                        this.setState({editMode: false}); 
                    } }>
                        Add Article
                        <Icon right>add_box</Icon>
                    </Button>
                </div>
                {this.state.showAddForm &&
                <ArticleForm article={{}} setArticle={this.setArticle}/>
                }
                </Col>
            </Row>
        );
    }
}

export default ArticlesList;