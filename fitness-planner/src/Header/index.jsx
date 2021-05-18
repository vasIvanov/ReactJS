import React, {useState, memo, useMemo, useCallback} from 'react';
import './index.css';
import { Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from 'react-router-dom'
import { useEffect, useContext } from 'react';
import {userContext} from '../userContext';
import Dropdown from './Dropdown';

const Header = ({isLogged, fixed, bgColor, history}) => {
  const [search, setSearch] = useState('');
  const [headerBgrd, setIsHeaderBgrd] = useState('');
  const color = bgColor ? bgColor : headerBgrd
  const userValue = useContext(userContext);
  const controller = new AbortController();

  const instructor = useMemo(() => {
    if(isLogged) {
      return (userValue && userValue.instructor) || localStorage.getItem('instructor') === 'true' || false;
    }
    return false;
  }, [isLogged, userValue])


  const handleSearchChange = useCallback((e) => {
    e.preventDefault()
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
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

    return () => {
      controller.abort()
    }
  }, [fixed, headerBgrd, controller])

    return (
      <Navbar bg={color}  fixed={fixed} expand="lg">
        <Navbar.Brand ><Link className='brand' to="/">Activity Planner</Link></Navbar.Brand>
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
            <Form inline onSubmit={e => {e.preventDefault(); history.push(`/search/${search}`);}}>
              <FormControl onChange={handleSearchChange} type="text" placeholder="Search" className="mr-sm-2" />
              <Link className='link custom-link' to={`/search/${search}`} >Search</Link>
            </Form>
          </Navbar.Collapse>
      </Navbar>
    ) 
}

export default memo(Header);