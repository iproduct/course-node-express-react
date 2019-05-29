import React from 'react';
import { Row, Col, Button, Icon } from 'react-materialize';
import Article from './Article';
import ArticleForm from './ArticleForm';

const API_URL = 'http://localhost:3000/api/articles/';

class ArticlesList extends React.Component {
    state = {
        articles: [],
        showAddForm: false,
        editMode: true,
        editedArticle: undefined
    }

    constructor(props) {
        super(props);
        fetch(API_URL)
            .then(resp => resp.json())
            .then(articles => {
                this.setState({articles});
            });
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
            // article.id = '' + Date.now();
            console.log(article);
            fetch(API_URL, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(article), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .then(a => {
                this.setState(s => ({ articles: [...s.articles, a] }));
                console.log('Created new article:', JSON.stringify(a))
              })
              .catch(error => console.error('Error:', error));
        }
        this.setState({showAddForm: false});
    }

    render() {
        return (
            <Row className="articles-main">
                <Col s={12} m={4}>
                {
                    this.state.articles.map(article => (
                        <Article key={article.id} article={article} editCallback={() => {
                            this.setState({editedArticle: article});
                            this.setState({showAddForm : true}); 
                            this.setState({editMode: true}); 
                        } }/>
                    ))
                }
                </Col>
                <Col s={12} m={4}>
                <div>
                    <Button waves="light" onClick={() => {
                        this.setState({editedArticle: {}});
                        this.setState({showAddForm : true}); 
                        this.setState({editMode: false}); 
                    } }>
                        Add Article
                        <Icon right>add_box</Icon>
                    </Button>
                </div>
                {this.state.showAddForm &&
                <ArticleForm article={this.state.editedArticle} setArticle={this.setArticle}/>
                }
                </Col>
            </Row>
        );
    }
}

export default ArticlesList;