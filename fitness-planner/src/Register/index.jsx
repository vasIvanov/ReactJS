import React, { useState, Fragment } from 'react';
import './index.css';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from '../services/user-service';
import * as yup from 'yup';

const Register = ({history, showChange}) => {
    const schema = yup.object({
      username: yup.string('username must be a string').required('username is required').min(4, 'username must be 4 or more chars').max(25, 'Username must be 25 char max'),
      password: yup.string('Password must be a string').required('Password is required').min(6, 'Password must be 6 or more chars').max(25, 'Password must be 25 chars max'),
      rePassword: yup.string('Password must be a string').oneOf([yup.ref('password'), null], 'Passwords dont match').required('Password is required').min(6, 'Password must be 6 or more chars').max(12, 'Password must be 12 chars max')
    });
    const [username, emailChange] = useState('');
    const [password, passwordChange] = useState('');
    const [rePassword, rePasswordChange] = useState('');
    const [city, setCity] = useState('');
    const [instructor, setInstructor] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [userError, setUserError] = useState('');
    

   
    const submitHandler = () => {
      const data = {
        username,
        password,
        city,
        instructor
      }
      schema
      .validate({username, password, rePassword}, {abortEarly: false})
      .then(() => {
        userService.register(data).then((e) => {
          if(e.errorMessage) {
            setUserError(e.errorMessage);
          } else {
            showChange();
            history.push('/login')
          }
          
        })
      })
      .catch(err => {
        err.inner.forEach(error => {
          if(error.path === 'username') {
            setUsernameError(error.message);
          } else if(error.path === 'password') {
            setPasswordError(error.message);
          } else if (error.path === 'rePassword') {
            setRePasswordError(error.message);
          }
        })
      }) 
    }

    return (
      <Fragment>
        <div className="form">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control value={username} onChange={(e) => emailChange(e.target.value)} type="text" placeholder="Enter username" />
              {usernameError ? <div>{usernameError}</div> : null}
              {userError ? <div>{userError}</div> : null}
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={(e) => passwordChange(e.target.value)} type="password" placeholder="Password" />
              {passwordError ? <div>{passwordError}</div> : null}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control value={rePassword} onChange={(e) => rePasswordChange(e.target.value)} type="password" placeholder="Repeat Password" />
              {rePasswordError ? <div>{rePasswordError}</div> : null}
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check  onChange={(e) => {setInstructor(e.target.checked)}} type="checkbox" label="Register as Instructor" />
            </Form.Group>
            <Button onClick={submitHandler} variant="primary" type="button">
              Submit
            </Button>
          </Form>
        </div>
      </Fragment>
        
    )
}






export default Register;