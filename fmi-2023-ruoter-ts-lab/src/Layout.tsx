import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface LayoutProps {
}

export const Layout = (props: LayoutProps) => {
    return (
        <div>
            <h1>Hello React Router!</h1>
            <nav>
                <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} to="/home">Home</NavLink> |
                <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} to="/about">About Us</NavLink> |
            </nav>
            <Outlet />
        </div>
    );
};
