import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

type Props = {}

const Layout = (props: Props) => {
    return (
        <>
            <h2>Hello React Router Demo</h2>
            <nav>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;