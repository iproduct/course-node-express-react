import React, { useState } from 'react'
import TextInput from './TextInput';

type Props = {}

const PostForm = (props: Props) => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [text, setText] = useState('');
    return (
        <form>
            <TextInput name="Title" value={title} onChange={setTitle} />
            <TextInput name="Tags" value={tags} onChange={setTags} />
            <TextInput name="Text" value={text} onChange={setText} />
        </form>
    )
}

export default PostForm;