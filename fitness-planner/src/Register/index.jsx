import React, { useState, Fragment } from 'react';
import './index.css';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from '../services/user-service';
import validate from './schema';
import Header from '../Header';

const Register = ({ history, showChange }) => {
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
    setUsernameError('');
    setPasswordError('');
    setRePasswordError('');
    setUserError('');
    const data = {
      username,
      password,
      city,
      instructor,
    };

    validate(username, password, rePassword)
      .then(() => {
        userService.register(data).then((e) => {
          if (e.errorMessage) {
            setUserError(e.errorMessage);
          } else {
            showChange();
            history.push('/login');
          }
        });
      })
      .catch((err) => {
        err.inner.forEach((error) => {
          if (error.path === 'username') {
            setUsernameError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          } else if (error.path === 'rePassword') {
            setRePasswordError(error.message);
          }
        });
      });
  };

  return (
    <Fragment>
      <Header isLogged={false} bgColor="dark" />
      <div className="form">
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => emailChange(e.target.value)}
              type="text"
              placeholder="Enter username"
            />

            {usernameError ? (
              <Alert variant={'danger'}>{usernameError}</Alert>
            ) : null}

            {userError ? <Alert variant={'danger'}>{userError}</Alert> : null}
          </Form.Group>

          <Form.Group controlId="formBasicCity">
            <Form.Label>City (optional)</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="City"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => passwordChange(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {passwordError ? (
              <Alert variant={'danger'}>{passwordError}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              value={rePassword}
              onChange={(e) => rePasswordChange(e.target.value)}
              type="password"
              placeholder="Repeat Password"
            />
            {rePasswordError ? (
              <Alert variant={'danger'}>{rePasswordError}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              onChange={(e) => {
                setInstructor(e.target.checked);
              }}
              type="checkbox"
              label="Register as Instructor"
            />
          </Form.Group>
          <Button onClick={submitHandler} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};
export default Register;
