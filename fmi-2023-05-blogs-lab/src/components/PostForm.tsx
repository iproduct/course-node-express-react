import React, { useState } from 'react'
import TextInput from './TextInput';

type Props = {}

const PostForm = (props: Props) => {
    const [title, setTitle] = useState('');
    return (
        <form>
            <TextInput name="title" value={title} onChange={setTitle} />
        </form>
    )
}

export default PostForm;