import React, {useState} from 'react';
import './Login.css';

export default function Login({onLogin, ...rest}) {
    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    return (
        <div className="row">
            <form className="col s12 Login-form" onSubmit={submitRegistration}>
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

                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );

    function submitRegistration(event) {
        event.preventDefault();
        const username = usernameText.trim();
        const password = passwordText.trim();
        if (username && password) {
            onLogin({username, password});
        }
    }
}
