import React from 'react';
import './Aside.css';
import Link from '../shared/Link/Link'

function Aside({isLogged}) {
    return <aside className='Aside'>
        <ul>
            <Link to="/">Posts</Link>
            {isLogged && <Link to="create-post">Create Post</Link>}
            {!isLogged && <Link to="/login">Login</Link>}
            {!isLogged && <Link to="/register">Register</Link>}
            {isLogged && <Link to="/profile">Profile</Link>}
        </ul>
    </aside>
}

export default Aside;