import React, {useState} from 'react';
import './PostForm.css';

export default function Register({onRegister, ...rest}) {
    const [firstNameText, setFirstNameText] = useState('');
    const [lastNameText, setLastNameText] = useState('');
    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [imageUrlText, setImageUrlText] = useState('');
    return (
        <div className="row">
            <form className="col s12 PostForm-form" onSubmit={submitRegistration}>
                <div className="input-field col s12">
                    <input
                        id="firstName"
                        type="text"
                        onChange={event => setFirstNameText(event.target.value)}
                        value={firstNameText}
                    />
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="lastName"
                        type="text"
                        onChange={event => setLastNameText(event.target.value)}
                        value={lastNameText}
                    />
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="username"
                        type="text"
                        onChange={event => setUsernameText(event.target.value)}
                        value={usernameText}
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                    <input
                        id="password"
                        type="password"
                        onChange={event => setPasswordText(event.target.value)}
                        value={passwordText}
                    />
                    <label htmlFor="password">Password</label>
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

    function submitRegistration(event) {
        event.preventDefault();
        const firstName = firstNameText.trim();
        const lastName = lastNameText.trim();
        const username = usernameText.trim();
        const password = passwordText.trim();
        const imageUrl = imageUrlText.trim();
        if (firstName && lastName && username && password) {
            onRegister({firstName, lastName, username, password, imageUrl});
        }
    }
}
