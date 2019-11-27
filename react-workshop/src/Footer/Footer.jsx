import React from 'react';
import './Footer.css';
import Link from '../shared/Link/Link'

function Footer() {
    return <nav className='Footer'>
        <ul>
            <Link url='#'>
                <img id="logo" src="logo192.png" alt=""/>
            </Link>
            <Link url="/login">Login</Link>
            <Link url="/register">Register</Link>
            <Link url="/profile">Profile</Link>
        </ul>
    </nav>
}

export default Footer;