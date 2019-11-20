import React from 'react';
import './Aside.css';
import Link from '../shared/Link/Link'

function Aside() {
    return <aside className='Aside'>
        <ul>
            <Link url="#">Link 2</Link>
            <Link url="#">Link 3</Link>
            <Link url="#">Link 4</Link>
        </ul>
    </aside>
}

export default Aside;