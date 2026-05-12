import {type SubmitEvent} from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const from = location.state?.from?.pathname || "/";

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        auth?.signin(username, () => {
            navigate(from, {replace: true})
        })
    }
    return (
        <>
            <h1>LoginPage</h1>
            <h2>You must be logged-in to access private page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input name="username" type="text" />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage