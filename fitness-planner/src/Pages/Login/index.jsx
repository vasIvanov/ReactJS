import React, { useState } from 'react';
import './index.css';
import { Button, Form, Alert } from 'react-bootstrap';
import {
  Link
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import validate from './schema';
import { useDispatch } from 'react-redux'
import {userLogin} from '../../features/userSlice'

const Login = ({history}) => {
    const [username, setUsername] = useState('');
    const [password, passwordChange] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      const data = {
        username,
        password
      }

      validate(username, password)
        .then(() => {
          dispatch(userLogin(data))
          history.push('/plans')
        })
        .catch(err => {
          console.log(err);
          if(err.inner){
            err.inner.forEach(error => {
              if(error.path === 'username') {
                setError(error.message);
              } else if(error.path === 'password') {
                setError(error.message);
              } 
            })
          }
        })
    }
      
    return (
      <React.Fragment>
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
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Submit
            </Button>
            <Link className='custom-register-button' to='/register'>Dont have account?</Link>
          </Form>
        </div>
      </React.Fragment>
    )
}

export default Login;