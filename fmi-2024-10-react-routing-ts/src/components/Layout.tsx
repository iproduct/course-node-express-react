import React from 'react';
import { NavLink, Outlet, useNavigation } from 'react-router-dom';
import './Layout.css';
import LoadingIndicator from './LoadingIndicator';

type Props = {}

const Layout = (props: Props) => {
    const navigation = useNavigation();
    return (
        <>
            <h2>Hello React Router Demo</h2>
            <nav>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/contacts">Contacts</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            <main>
                <Outlet />
                {navigation.state === "loading" && <LoadingIndicator />}
            </main>
        </>
    )
}

export default Layout;