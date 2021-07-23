import React, {useState, memo} from 'react';
import './index.css';
import { Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from 'react-router-dom'
import { useEffect } from 'react';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {userLogout} from '../../features/userSlice'

const Header = ({isLogged, fixed, history, homepage}) => {
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('/search?');
  const [headerBgrd, setIsHeaderBgrd] = useState('');
  const color = homepage ? headerBgrd : 'dark'
  const abortController = new AbortController();
  const dispatch = useDispatch()
  const instructor = useSelector(state => state.user.user?.instructor) || localStorage.getItem('instructor') 

  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value);
  }

if(homepage) {
  document.addEventListener('scroll', () => {
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
  }, [search, abortController])

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
            
            {isLogged && <Link className='link' to='#' onClick={(e) => {
              e.preventDefault();
              dispatch(userLogout())
              history.push('/')
            }}>Logout</Link>}
          </Nav>
          <Form inline onSubmit={e => {e.preventDefault(); history.push(url);}}>
            <FormControl onChange={handleSearchChange} type="text" placeholder="Search" className="mr-sm-2" />
            <Link className='link custom-link' to={url} >Search</Link>
          </Form>
        </Navbar.Collapse>
    </Navbar>
  ) 
}

export default memo(Header);