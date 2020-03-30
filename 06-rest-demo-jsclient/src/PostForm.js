import React, {useState} from 'react';
import './PostForm.css';

export default function PostForm({onSubmitPost, ...rest}) {
    const [titleText, setTitleText] = useState('');
    const [contentText, setContentText] = useState('');
    const [imageUrlText, setImageUrlText] = useState('');
    return (
        <div className="row">
            <form className="col s12 PostForm-form" onSubmit={submitPost}>
                <div className="input-field col s12">
                    <input
                        id="title"
                        type="text"
                        onChange={event => setTitleText(event.target.value)}
                        value={titleText}
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12">
                    <textarea id="content" className="materialize-textarea" onChange={event => setContentText(event.target.value)}
                              value={contentText}>
                    </textarea>
                    <label htmlFor="content">Post Content</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="imageUrl"
                        type="text"
                        onChange={event => setImageUrlText(event.target.value)}
                        value={imageUrlText}
                    />
                    <label htmlFor="imageUrl">Image URL</label>
                </div>

                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );

    function submitPost(event) {
        event.preventDefault();
        const title = titleText.trim();
        const content = contentText.trim();
        const imageUrl = imageUrlText.trim();
        if (title && content && imageUrl) {
            onSubmitPost({
                title: title,
                content: content,
                imageUrl: imageUrl
            })
        }
    }
}
