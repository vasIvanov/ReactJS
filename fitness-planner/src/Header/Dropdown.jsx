import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import {
    Link
  } from 'react-router-dom'

const DropdownPanel = () => {
    return (
        <DropdownButton className='link' id="dropdown-basic-button" title="Instructor Panel">
            <Link className='dropdown-link link' to="/create-plan">Create Plan</Link>
            <Link className='dropdown-link link' to="/my-plans">Created Plans</Link>
        </DropdownButton>
    )
}

export default DropdownPanel;