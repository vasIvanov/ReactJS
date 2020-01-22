import React, { useState, Fragment } from 'react';
import './index.css';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';
import userService from '../services/user-service';

const Login = ({history, login}) => {

    const [username, setUsername] = useState('');
    const [password, passwordChange] = useState('');
  
    const handleSubmit = (e) => {
      const data = {
        username,
        password
      }
      login(history, data).catch(error => {
        console.log(error);
        
      })
    }
      
    return (
      <Fragment>
        <div className="form">
        <Form>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={(e) => passwordChange(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="primary" type="button">
              Submit
            </Button>
          </Form>
        </div>
      </Fragment>
    )
}

export default Login;