import { Link, Outlet } from "react-router"
import { AuthStatus } from "../components/AuthStatus"


function Layout() {
    return (
        <div className="app">
            <h1>Auth Demo</h1>
            <AuthStatus />
            <nav>
                <Link to="/public">Public Page</Link>
                &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                <Link to="/private">Private Page</Link>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout