
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DEFAULT_AUTOR_ID } from '../model/post-model';
import blogsApiClient from '../service/blogs-api-client';
import { withRouter } from '../util/router-utils';
import './PostForm.css';

export const ADD = 0;
export const EDIT = 1;
export const EditMode = ['ADD', 'EDIT']

const newPost = {
    id: '',
    title: '',
    content: '',
    tags: '',
    imageUrl: '',
    authorId: DEFAULT_AUTOR_ID,
    active: true
}
class PostForm extends Component {
    static propTypes = {
        mode: PropTypes.oneOf([ADD, EDIT]),
        post: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired,
            imageUrl: PropTypes.string,
            authorId: PropTypes.number,
            active: PropTypes.bool
        }),
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onError: PropTypes.func,
        router: PropTypes.shape({
            location: PropTypes.object.isRequired,
            navigate: PropTypes.func.isRequired,
            params: PropTypes.object.isRequired,
        }),
    }

    static getDerivedStateFromProps(props, state) {
        if (state.tags instanceof Array) {
            return { tags: state.tags.join(', ') }
        } else {
            return null;
        }
    }

    state = this.props.mode === EDIT ? { ...this.props.post } : { ...newPost };

    componentDidMount() {
        blogsApiClient.fetchPostById(this.props.router.params.postId)
        .then(post => this.setState(post))
        .catch(err => this.props.onError(err))
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: validate input
        this.props.onSubmit(Object.assign({}, this.state, { tags: this.state.tags.split(',').map(tag => tag.trim()) }))
    }

    handleReset = (event) => {
        event.preventDefault();
        this.setState({ ...newPost })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        console.log(`Setting field: ${name} = ${value}`);
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                <h3>{this.props.router.params.postId? 'Edit': 'Add New'} Post </h3>
                <p>{JSON.stringify(this.props.router)}</p>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="id" type="text" disabled value={this.state.id} />
                        <label htmlFor="id">ID</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="title" type="text" className="validate" value={this.state.title} onChange={this.handleInputChange} />
                        <label htmlFor="title">Title</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="materialize-textarea" value={this.state.content} onChange={this.handleInputChange}></textarea>
                    </div>

                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="tags" type="text" className="validate" value={this.state.tags} onChange={this.handleInputChange} />
                        <label htmlFor="tags">Tags</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="imageUrl" type="url" className="validate" value={this.state.imageUrl} onChange={this.handleInputChange} />
                        <label htmlFor="imageUrl">Blog Image URL</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <label>
                            <label>
                                <input id="active" type="checkbox" checked={this.state.active} onChange={this.handleInputChange} />
                                <span>Is Active</span>
                            </label>
                        </label>
                    </div>
                </div>
                <div className='PostForm-button-panel'>
                    <button className="btn waves-effect waves-light" type="submit" name="submit">Submit
                        <i className="material-icons right">send</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 orange accent-2" type="reset" name="reset">Reset
                        <i className="material-icons right">autorenew</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 red accent-3" type="button" name="cancel"
                        onClick={this.props.onCancel}>Cancel
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
            </form>
        )
    }
}

export default withRouter(PostForm);