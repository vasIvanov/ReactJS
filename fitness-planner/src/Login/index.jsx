import React, { useState } from 'react';
import './index.css';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as  yup from 'yup'
const Login = ({history, login}) => {
    const schema = yup.object({
      username: yup.string('username must be a string').required('username is required').min(4, 'Invalid username or password').max(25, 'Invalid username or password'),
      password: yup.string('Password must be a string').required('Password is required').min(6, 'Invalid username or password').max(25, 'Invalid username or password'),
    });

    const [username, setUsername] = useState('');
    const [password, passwordChange] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = () => {
      setError('');
      const data = {
        username,
        password
      }

      schema
        .validate({username, password}, {abortEarly: false})
        .then(() => {
          login(history, data)
          .catch(error => {
            setError(error.errorMessage);
          })
        })
        .catch(err => {
          err.inner.forEach(error => {
            console.log(error);
            
            if(error.path === 'username') {
              setError(error.message);
            } else if(error.path === 'password') {
              setError(error.message);
            } 
          })
        }) 

      
    }
      
    return (
        <div className="form">
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />
            

            <Form.Text className="text-muted">
              We'll never share your information with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={(e) => passwordChange(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            
            {error ? <Alert variant={'danger'}>
              {error}
            </Alert> : null}
            <Button onClick={handleSubmit} variant="primary" type="button">
              Submit
            </Button>
          </Form>
        </div>
    )
}

export default Login;