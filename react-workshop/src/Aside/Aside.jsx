import React from 'react';
import './Aside.css';
import Link from '../shared/Link/Link'

function Aside() {
    return <aside className='Aside'>
        <ul>
            <Link url="/login">Login</Link>
            <Link url="/register">Register</Link>
            <Link url="/profile">Profile</Link>
        </ul>
    </aside>
}

export default Aside;