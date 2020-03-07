import React, {useState} from 'react';
import './index.css';
import { Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from 'react-router-dom'
import { useEffect, useContext } from 'react';
import {userContext} from '../userContext';

const Header = ({isLogged}) => {
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('/search?');
  const userValue = useContext(userContext);
  let instructor = false;
  if(isLogged) {
    instructor = (userValue && userValue.instructor) || localStorage.getItem('instructor') === 'true';
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    setUrl(`/search/${search}`)
  }, [search])

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand ><Link className='brand' to="/">Fitness Planner</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className='link' to="/">Home</Link>
              {!isLogged && <Link className='link' to="/login">Login</Link>}
              {!isLogged && <Link className='link' to="/register">Register</Link>}
              {isLogged && instructor ? <Link className='link' to="/create-plan">Create Plan</Link> : null}
              {isLogged && <Link className='link' to="/logout">Logout</Link>}
              {isLogged && <Link className='link' to="/my-plans">My Plans</Link>}
            </Nav>
            <Form inline>
              <FormControl onChange={handleSearchChange} type="text" placeholder="Search" className="mr-sm-2" />
              <Link className='link custom-link' to={url} >Search</Link>
            </Form>
          </Navbar.Collapse>
      </Navbar>
    )
}

export default Header;