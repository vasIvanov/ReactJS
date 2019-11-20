import React from 'react';
import './Navigation.css';
import Link from '../shared/Link/Link'

function Navigation() {
    return <nav className='Navigation'>
        <ul>
            <Link url='#'>
                <img id="logo" src="logo192.png" alt=""/>
            </Link>
            <Link>Link 2</Link>
            <Link>Link 3</Link>
            <Link>Link 4</Link>
        </ul>
    </nav>
}

export default Navigation;