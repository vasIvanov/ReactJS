import React, { useState, Fragment } from 'react';
import './index.css';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';
import userService from '../services/user-service';

const Register = ({history}) => {
    const [username, emailChange] = useState('');
    const [password, passwordChange] = useState('');
    const [rePassword, rePasswordChange] = useState('');
    const [instructor, setInstructor] = useState(false);
  
    const submitHandler = () => {
      const data = {
        username,
        password,
        instructor
      }
      
      userService.register(data).then(() => {
        history.push('/login')
      })
      
    }

    return (
      <Fragment>
        <div className="form">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control value={username} onChange={(e) => emailChange(e.target.value)} type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={(e) => passwordChange(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control value={rePassword} onChange={(e) => rePasswordChange(e.target.value)} type="password" placeholder="Repeat Password" />
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