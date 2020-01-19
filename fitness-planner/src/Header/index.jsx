import React from 'react';
import './index.css';
import { Button, Form, Navbar, NavDropdown, Nav, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from 'react-router-dom'

const Header = () => {
  

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand ><Link className='brand' to="/">Fitness Planner</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          <Link className='link' to="/">Home</Link>
          <Link className='link' to="/login">Login</Link>
          <Link className='link' to="/register">Register</Link>
          <Link className='link' to="/create-plan">Create Plan</Link>

          
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
    )
}

export default Header;