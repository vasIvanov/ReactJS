import React from 'react';
import './Footer.css';
import Link from '../shared/Link/Link'

function Footer() {
    return <nav className='Footer'>
        <ul>
            <Link url='#'>
                <img id="logo" src="logo192.png" alt=""/>
            </Link>
            <Link url="#">Link 2</Link>
            <Link url="#">Link 3</Link>
            <Link url="#">Link 4</Link>
        </ul>
    </nav>
}

export default Footer;