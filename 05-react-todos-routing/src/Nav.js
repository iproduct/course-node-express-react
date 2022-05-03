import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav = () => {
    return (
        <nav className='Nav'>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/hello">
                Home
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/">
                Todos
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : undefined} to="/about">
                About
            </NavLink>
        </nav>
    );
}
