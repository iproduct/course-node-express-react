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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name, value);
    this.setState({
      [name]: value
    });
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
      {this.state.id && (<label>
        ID:
        <input type="text" name="id" value={this.state.id} onChange={this.handleChange} readOnly={true}/>
      </label>)}
      <label>
        Title:
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
      </label>
      <label>
        Content:
        <input type="text"  name="content" value={this.state.content} onChange={this.handleChange} />
      </label>
      <label>
        Picture URL:
        <input type="text"  name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange} />
      </label>
      <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ArticleForm;