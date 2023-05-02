import React, { FormEvent, useState } from 'react'
import TextInput from './TextInput';
import { PostCreateDto } from '../model/posts';
import './PostForm.css';

type Props = {
    onSubmit: (post: PostCreateDto) => void;
}

const PostForm = ({onSubmit}: Props) => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    function handleSubmit(e: FormEvent) {
        e.preventDefault(); 
        onSubmit(new PostCreateDto(title, content, 1, tags.split(',').map(tag => tag.trim()), imageUrl));
    }
    return (
        <form onSubmit={handleSubmit} >
            <TextInput name="Title" value={title} onChange={setTitle} />
            <TextInput name="Tags" value={tags} onChange={setTags} />
            <TextInput name="Content" value={content} onChange={setContent} />
            <TextInput name="Image" value={imageUrl} onChange={setImageUrl} />
            <div className='PostForm-button-panel'>
                    <button className="btn waves-effect waves-light" type="submit" name="submit">Submit
                        <i className="material-icons right">send</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 orange accent-2" type="reset" name="reset">Reset
                        <i className="material-icons right">autorenew</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 red accent-3" type="button" name="cancel"
                        onClick={() => {}}>Cancel
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
        </form>
    )
}

export default PostForm;