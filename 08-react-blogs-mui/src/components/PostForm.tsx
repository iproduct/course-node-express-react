import React, { BaseSyntheticEvent, FormEvent } from 'react';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormInputText from './FormInputText';
import FormInputSelect, { SelectOption } from './FormInputSelect';
import { IdType, Optional, PostListener } from '../shared/common-types';
import { Post, PostCreateDTO, PostStatus } from '../model/post';

const EMPTY_POST = new PostCreateDTO('', '', '', 1, []);

interface PostFormProps {
    post: Optional<Post> | PostCreateDTO;
    onSubmitPost: PostListener;
}

type FormData = {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imageUrl: string;
    status: PostStatus;
    authorId: IdType;
};

const TAGS_PATTERN = /^(\w{2,}[,\s]+)*(\w{2,})?$/;

const POST_SELECT_OPTIONS: SelectOption[] = Object.keys(PostStatus)
    .filter((item) => !isNaN(Number(item)))
    .map((ordinal: string) => parseInt(ordinal))
    .map((ordinal: number) => ({ key: ordinal, value: PostStatus[ordinal] }));

const schema = yup.object({
    id: yup.number().positive(),
    title: yup.string().required().min(2).max(40),
    content: yup.string().required().min(20).max(1024),
    // tags: yup.string().matches(TAGS_PATTERN, 'tags should contain only letters, digits and spaces'),
    tags: yup.array(yup.string().matches(/^\w*(\s+\w*)*$/, 'tags should contain only letters, digits and spaces')).required(),
    imageUrl: yup.string().required().url(),
    status: yup.number().min(1).max(2),
    authorId: yup.number().positive().required(),
}).required();

export default function PostForm({ post = EMPTY_POST, onSubmitPost }: PostFormProps) {
    const methods = useForm<FormData>({
        // defaultValues: { ...post, tags: post?.tags.join(', ') },
        defaultValues: { ...post },
        mode: 'onChange',
        resolver: yupResolver(schema),
        context: {someValue: 'someValue'}
    });
    const { control, handleSubmit, reset, formState: { errors, isDirty, isValid } } = methods;

    const onSubmit = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();
        // const newPost = { ...data, tags: data.tags.split(/,\s*/), likeCounter: 0 }
        const newPost = { ...data, tags: data.tags.filter(tag => tag.length > 0), likeCounter: 0 }
        console.log(newPost);
        onSubmitPost(newPost);  
        console.log("RESET to:", post);
        // reset({ ...post, tags: post?.tags.join(', ') });
        reset({ ...post });
    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('RESETING FORM');
        console.log("RESET to:", post);
        // reset({ ...post, tags: post?.tags.join(', ') });
        reset({ ...post });
    }

    console.log(control._formValues, errors.tags);
    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#ddf',
                padding: '20px',
                '& .MuiFormControl-root': { m: 0.5, width: 'calc(100% - 10px)' },
                '& .MuiButton-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)} onReset={onReset}
        >
            <FormInputText name='id' label='ID' control={control} disabled size='small' />
            <FormInputText name='title' label='Title' control={control} error={errors.title}
                rules={{ required: true, minLength: 2, maxLength: 40 }} />
            <FormInputText name='content' label='Content' control={control} error={errors.content}
                rules={{ required: true, minLength: 20, maxLength: 1024 }} />
            <FormInputText name='tags' label='Tags' control={control} error={errors.tags} isArray={true}
                rules={{ pattern: TAGS_PATTERN }} />
            <FormInputText name='imageUrl' label='Image URL' control={control} error={errors.imageUrl}
                rules={{ required: true }} />
            <FormInputText name='authorId' label='Author ID' control={control} error={errors.authorId}
                rules={{ required: true }} />
            <FormInputSelect name='status' label='Status' control={control}
                rules={{ required: true }} options={POST_SELECT_OPTIONS} defaultOptionIndex={0}/>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={!(isDirty && isValid)}>
                Submit
            </Button>
            <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                Reset
            </Button>
        </Box>
    );
}
