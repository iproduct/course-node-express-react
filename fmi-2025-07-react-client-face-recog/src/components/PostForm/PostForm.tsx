/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import './PostForm.css';

import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Form, Formik, type FormikProps} from 'formik';
import { useEffect, type ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { createPost, fetchPostById, updatePost } from '../../features/posts/postsSlice';
import { Post } from '../../model/post.model';
import { DisplayFormikState } from '../DisplayFormikState/DispalyFormikState';
import MaterialFiled from '../MaterialField/MaterialField';
import type { RootState } from '../../app/rootReducer';
import type { UnknownAction } from 'redux';
import { useNavigate, useParams } from 'react-router';



export interface MyFormValues {
    id: string;
    title: string;
    text: string;
    imageUrl?: string;
    categories?: string;
    keywords?: string;
}


export const PostForm = () => {
    const params = useParams();
    const post = useSelector((state: RootState) => {
        if (params.postId) {
            const index = state.posts.posts.findIndex(p => p.id === params.postId);
            if (index >= 0) {
                return state.posts.posts[index];
            }
        }
        return undefined;
    });

    const initialValues: MyFormValues = {
        id: post?.id || '',
        title: post?.title || '',
        text: post?.text || '',
        imageUrl: post?.imageUrl || '',
        categories: post?.categories?.join(', ') || '',
        keywords: post?.keywords.join(', ') || ''
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.postId) {
            dispatch(fetchPostById(params.postId)as unknown as UnknownAction);
        }
    }, [params.postId, dispatch]);



    // const loading = useSelector((state: RootState) => {
    //     return state.posts.loading;
    // });
    // const completed = useSelector((state: RootState) => {
    //     return state.posts.pendingSubmission && !state.posts.loading;
    // });
    // const errors = useSelector((state: RootState) => {
    //     return state.posts.error;
    // });
    // useEffect(() => {
    //     if (completed && !errors) {
    //         history.push('/posts');
    //     }
    //     if (!loading) {
    //         dispatch(submissionComplete());
    //     }
    // }, [completed, loading, errors, dispatch, history]);

    return (
        <Formik initialValues={initialValues}
            onSubmit={(values) => {
                const result = {
                    id: values.id,
                    title: values.title,
                    text: values.text,
                    imageUrl: values.imageUrl,
                    authorId: '',
                    keywords: values.keywords?.trim().split(/[\s,;]+/).filter(kword => kword.length > 0),
                    categories: values.categories?.trim().split(/[\s,;]+/).filter(kword => kword.length > 0)
                } as Post;
                if (result.id) { //Edit
                    dispatch(updatePost(result, navigate) as unknown as UnknownAction);
                } else { //Create
                    dispatch(createPost(result, navigate) as unknown as UnknownAction);
                }
            }}
            validateOnChange
            validationSchema={
                Yup.object().shape({
                    title: Yup.string().required().min(2).max(40),
                    text: Yup.string().required().min(2).max(1024),
                    imageUrl: Yup.string().url(),
                    keywords: Yup.string().trim().matches(/^([\w-_+]+)([,\s]+([\w-_+]+))*$/, 'Keywords must be a comma/space separated list of words. Words should contain only letters, digits, "_", "+" and "-" characters.'),
                    categories: Yup.string().trim().matches(/^([\w-_+]+)([,\s]+([\w-_+]+))*$/, 'Categories must be a comma/space separated list of words. Words should contain only letters, digits, "_", "+" and "-" characters.'),
                })
            }
        >
            {(props) => <PostFormInternal {...props} />}
        </Formik >
    );
};

const PostFormInternal: (props: FormikProps<MyFormValues>) => ReactElement =
    ({ values, handleChange, dirty, touched, errors, isSubmitting, setSubmitting, handleReset }) => {
        const loading = useSelector((state: RootState) => {
            return state.posts.loading;
        });
        useEffect(() => {
            setSubmitting(loading)
        }, [loading, setSubmitting]);
        return (
            <Form className="col s6">
                <div className="row">
                    <MaterialFiled name='title' label='Title' />
                    <MaterialFiled name='text' rowsMax={20} label='Blog Text' />
                    <MaterialFiled name='imageUrl' label='Blog Image URL' />
                    <MaterialFiled name='keywords' label='Keywords' />
                    <MaterialFiled name='categories' label='Categories' />
                </div>
                <div className="PostForm-butons row">
                    <Button variant="contained" color="primary" type="submit" name="action" disabled={isSubmitting ||
                        !dirty || Object.values(errors).some(err => !!err === true)} endIcon={<Icon>send</Icon>}>
                        Submit
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleReset} disabled={!dirty || isSubmitting} 
                        endIcon={<Icon>settings_backup_restore</Icon>}>
                        Reset
                    </Button>
                </div>
                <DisplayFormikState />
            </Form>
        )
    }
