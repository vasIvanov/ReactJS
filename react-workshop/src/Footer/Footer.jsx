import React from 'react';
import './Footer.css';
import Link from '../shared/Link/Link'

function Footer({isLogged}) {
    return <nav className='Footer'>
        <ul>
            <Link to='#'>
                <img id="logo" src="logo192.png" alt=""/>
            </Link>
            <Link to="/">Posts</Link>
            {isLogged && <Link to="create-post">Create Post</Link>}
            {!isLogged && <Link to="/login">Login</Link>}
            {!isLogged && <Link to="/register">Register</Link>}
            {isLogged && <Link to="/profile">Profile</Link>}
        </ul>
    </nav>
}

export default Footer;