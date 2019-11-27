import React from 'react';
import './Link.css';
import {Link as ReactLink} from "react-router-dom";

function Link({ children, to }) {
    return <li className='listItem'>
        <ReactLink to={to} >{children}</ReactLink>
    </li>;
}

export default Link;