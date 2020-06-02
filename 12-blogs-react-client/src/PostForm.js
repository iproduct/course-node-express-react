import React, { useState, useEffect } from 'react';
import './PostForm.css';

export default function PostForm({ master, onSubmitPost, ...rest }) {
    const idText = (master && master.id) || '';
    const [titleText, setTitleText] = useState((master && master.title) || '');
    const [subtitleText, setSubTitleText] = useState((master && master.subtitle) || '');
    const [contentText, setContentText] = useState((master && master.content) || '');
    const [imageUrlText, setImageUrlText] = useState((master && master.imageUrl) || '');
    useEffect(() => {
        window.M.textareaAutoResize(document.getElementById('content'));
    });
    return (
        <div className="row">
            <form className="col s12 PostForm-form" onSubmit={submitPost}>
                <div className="input-field col s12">
                    <input
                        id="id"
                        type="text"
                        disabled
                        value={idText}
                    />
                    <label class="active" htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="title"
                        type="text"
                        minLength="2"
                        maxLength="60"
                        className="validate"
                        onChange={event => setTitleText(event.target.value)}
                        value={titleText}
                    />
                    <label class="active" htmlFor="title">Title</label>
                    <span class="helper-text" data-error="Title must be between 2 and 60 characters long." data-success=""></span>
                </div>
                <div className="input-field col s12">
                    <input
                        id="subtitle"
                        type="text"
                        maxLength="120"
                        onChange={event => setSubTitleText(event.target.value)}
                        value={subtitleText}
                    />
                    <label class="active" htmlFor="title">Subtitle</label>
                    <span class="helper-text" data-error="Subtitle must be no longer than 120 characters." data-success=""></span>
                </div>
                <div className="input-field col s12">
                    <textarea id="content" className="materialize-textarea" onChange={event => setContentText(event.target.value)}
                        value={contentText}>
                    </textarea>
                    <label class="active" htmlFor="content">Post Content</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="imageUrl"
                        type="text"
                        onChange={event => setImageUrlText(event.target.value)}
                        value={imageUrlText}
                    />
                    <label class="active" htmlFor="imageUrl">Image URL</label>
                </div>

                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );

    function submitPost(event) {
        event.preventDefault();
        const id = idText.trim();
        const title = titleText.trim();
        const subtitle = subtitleText.trim();
        const content = contentText.trim();
        const imageUrl = imageUrlText.trim();
        if (title && content && imageUrl) {
            onSubmitPost({
                id,
                title,
                subtitle,
                content: content,
                imageUrl: imageUrl
            })
        }
    }
}
