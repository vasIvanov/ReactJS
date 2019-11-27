import React from 'react';
import './Navigation.css';
import Link from '../shared/Link/Link';

function Navigation() {
    return <nav className='Navigation'>
        <ul>
            <Link to='/'>
                <img id="logo" src="logo192.png" alt=""/>
            </Link>
            <Link to="/">Posts</Link>
            <Link to="create-post">Create Post</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
        </ul>
    </nav>
}

export default Navigation;