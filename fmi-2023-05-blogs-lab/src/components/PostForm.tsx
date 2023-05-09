import React, { BaseSyntheticEvent, FormEvent } from 'react'
import TextInput from './TextInput';
import { Post, PostCreateDto } from '../model/posts';
import './PostForm.css';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type Props = {
    onSubmit: (post: PostCreateDto) => void;
    onCancel: () => void;
    post: Post | PostCreateDto;
}

type FormData = {
    id: number;
    title: string;
    content: string;
    tags: string;
    imageUrl: string;
};

const TAGS_PATTERN = /^(\w{2,}[,\s]+)*(\w{2,})?$/;

const schema = yup.object({
    id: yup.number().positive(),
    title: yup.string().required().min(2).max(40),
    content: yup.string().required().min(20).max(1024),
    tags: yup.string().matches(TAGS_PATTERN, 'tags should contain only letters, digits and spaces'),
    // tags: yup.array(yup.string().matches(/^\w*(\s+\w*)*$/, 'tags should contain only letters, digits and spaces')).required(),
    imageUrl: yup.string().required().url(),
}).required();

const PostForm = ({ post, onSubmit, onCancel }: Props) => {
    const methods = useForm<FormData>({
        defaultValues: { ...post, tags: post?.tags.join(', ') },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = methods;

    // function handleSubmit(e: FormEvent) {
    //     e.preventDefault(); 
    //     onSubmit(new PostCreateDto(title, content, 1, tags.split(',').map(tag => tag.trim()), imageUrl));
    //     clearForm();
    // }

    const onSubmitForm = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();
        // const newPost = { ...data, tags: data.tags.split(/,\s*/), likeCounter: 0 }
        const newPost = { ...data, tags: data.tags.split(/,\s*/).filter(tag => tag.length > 0), authorId: 1, active: true }
        console.log(newPost);
        onSubmit(newPost);
        console.log("RESET to:", post);
        // reset({ ...post, tags: post?.tags.join(', ') });
        reset({ ...post, tags: post?.tags.join(', ') });
    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('RESETING FORM');
        console.log("RESET to:", post);
        // reset({ ...post, tags: post?.tags.join(', ') });
        reset({ ...post, tags: post?.tags.join(', ') });
    }
    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmitForm)} onReset={onReset}>
                <TextInput name="title" />
                <TextInput name="tags" />
                <TextInput name="content" />
                <TextInput name="imageUrl" label="Image URL" control={control} />
                <div className='PostForm-button-panel'>
                    <button className="btn waves-effect waves-light" type="submit" name="submit" disabled={!(isDirty && isValid)}>
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 orange accent-2" type="reset" name="reset">Reset
                        <i className="material-icons right">autorenew</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 red accent-3" type="button" name="cancel"
                        onClick={() => { onCancel(); reset({ ...post, tags: post?.tags.join(', ') }) }}>Cancel
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
            </form>
        </FormProvider>
    )
}

export default PostForm;