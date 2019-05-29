import React from 'react';
import { Row, Col, Button, Icon } from 'react-materialize';

class ArticleForm extends React.Component {
  setArticle;

  constructor(props) {
    super(props);
    const {article, setArticle} = props;
    this.setArticle = setArticle;
    this.state = {
      master: article, 
      id: article.id, 
      title: article.title, 
      content: article.content, 
      imageUrl:article.imageUrl
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleSubmit(event) {
    this.setArticle({
      id: this.state.id, 
      title: this.state.title, 
      content: this.state.content, 
      imageUrl: this.state.imageUrl
    });
    this.setState({
      id : '',
      title :  '', 
      content : '', 
      imageUrl : ''
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.title} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ArticleForm;