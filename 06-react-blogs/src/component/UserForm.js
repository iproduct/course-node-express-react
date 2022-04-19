
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ADMIN, AUTHOR, READER } from '../model/user-model';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './PostForm.css';


export const ADD = 0;
export const EDIT = 1;
export const EditMode = ['ADD', 'EDIT']

const newUser = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    passwod: '',
    imageUrl: '',
    role: READER,
    active: true
}

const schema = object({
    firstName: string().required().min(2).max(20),
    lastName: string().required().min(2).max(20),
}).required();


const UserForm = ({ user, mode, onSubmit }) => {

    const [state, setState] = useState(mode === EDIT ? { ...user } : { ...newUser });
    const { register, formState, handleSubmit } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const submitForm = (data) => {
        console.log(data);
        onSubmit(data);
    };

    const resetForm = (event) => {
        event.preventDefault();
        setState({ ...newUser })
    }
    const { errors, isDirty, isValid } = formState;

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <input {...register("firstName", { required: true, maxLength: 20 })} />
                <p>{errors.firstName?.message}</p>
                <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
                <p>{errors.lastName?.message}</p>
                <div className='PostForm-button-panel'>
                    <button disabled={!isDirty || !isValid} className="btn waves-effect waves-light" type="submit" name="submit" >
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                    <button className="btn waves-effect waves-light #ff1744 red accent-3" type="reset" name="reset">Reset
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
            </form>
            {/* <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
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
                        <button className="btn waves-effect waves-light #ff1744 red accent-3" type="reset" name="reset">Reset
                            <i className="material-icons right">cancel</i>
                        </button>
                    </div>
                </form> */}
        </>
    )
}


UserForm.propTypes = {
    mode: PropTypes.oneOf([ADD, EDIT]),
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        passwod: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        role: PropTypes.oneOf([READER, AUTHOR, ADMIN]),
        active: PropTypes.bool
    }),
    onSubmit: PropTypes.func.isRequired
}

export default UserForm;