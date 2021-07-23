import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom'

const DropdownPanel = () => {
    return (
        <DropdownButton className='link' id="dropdown-basic-button" title="Instructor Panel">
            <Link className='dropdown-link link' to="/create-plan">Create Plan</Link>
            <Link className='link' to="/create-dance">Add Dance Event</Link>
            <Link className='dropdown-link link' to="/my-plans">Created Activities</Link>
        </DropdownButton>
    )
}

export default DropdownPanel;