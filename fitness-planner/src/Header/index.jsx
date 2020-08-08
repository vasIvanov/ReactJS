import React, {useState} from 'react';
import './index.css';
import { Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from 'react-router-dom'
import { useEffect, useContext } from 'react';
import {userContext} from '../userContext';
import Dropdown from './Dropdown';

const Header = ({isLogged, fixed, bgColor}) => {
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('/search?');
  const [headerBgrd, setIsHeaderBgrd] = useState('');
  const color = bgColor ? bgColor : headerBgrd
  const userValue = useContext(userContext);
  let instructor = false;
  const abortController = new AbortController;
  if(isLogged) {
    instructor = (userValue && userValue.instructor) || localStorage.getItem('instructor') === 'true';
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

    if(fixed) {
      document.addEventListener('scroll', () => {
        const isTop = window.scrollY < 100;
        if (!isTop) {
          setIsHeaderBgrd('dark')
        } else {
          setIsHeaderBgrd('')
        }
      });
    } else {
      document.removeEventListener('scroll', () => {
        const isTop = window.scrollY < 100;
        if (!isTop) {
          setIsHeaderBgrd('dark')
        } else {
          setIsHeaderBgrd('')
        }
      });
    }

  useEffect(() => {
    setUrl(`/search/${search}`)
    return function cleanup() {
      abortController.abort();
    }
  }, [search])

    return (
      <Navbar bg={color}  fixed={fixed} expand="lg">
        <Navbar.Brand ><Link className='brand' to="/">Fitness Planner</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!isLogged ? <Link className='link' to="/">Home</Link> : <Link className='link' to="/favorite-plans">Favorites</Link>}
              {!isLogged && <Link className='link' to="/login">Login</Link>}
              {!isLogged && <Link className='link' to="/register">Register</Link>}
              {<Link className='link' to="/plans">Browse</Link>}
              {isLogged && instructor ? <Dropdown/> : null}
              {/* {isLogged && instructor ? <Link className='link' to="/create-plan">Create Plan</Link> : null}
              {isLogged && instructor ? <Link className='link' to="/my-plans">Created Plans</Link> : null} */}
              {isLogged && <Link className='link' to="/logout">Logout</Link>}
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