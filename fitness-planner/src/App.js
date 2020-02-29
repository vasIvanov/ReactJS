import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import CreatePlan from './Create-plan';
import PlanDetails from './PlanDetails';
import MyPlans from './MyPlans';
import Header from './Header';
import Logout from './Logout';
import NotFound from './NotFound';
import SearchedResults from './SearchedResults';
import {userContext} from './userContext';
import { Toast } from 'react-bootstrap';
import render from './utils/render';
import parseCookies from './utils/parseCookies';
import {loginFunc, logoutFunc} from './utils/user';

const App = () => {
  const cookies = parseCookies();
  const [isLogged, setIsLogged] = useState(!!cookies['x-auth-token']);
  const [userData, setUserData] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  
    return (
      <React.Fragment>
        <Router>
          <userContext.Provider value={userData}>
            <Header userData={userData} isLogged={isLogged}/>
            <div aria-live="polite" aria-atomic="true" className='toast-outer' >
              <div className='toast-inner' >
                <Toast  onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body className='toast-body'>
                    {message}
                </Toast.Body>
              </Toast>
            </div>
          </div>
            <Switch>
              <Route exact path="/" render={render(Home, {isLogged, userData})} />
              {!isLogged && <Route path="/login" render={render(Login, {isLogged, login: loginFunc(setIsLogged, setUserData, setShow, setMessage)})}/>}
              {!isLogged && <Route path="/register" render={render(Register, {isLogged, showChange: () => {setShow(true); setMessage('Registration Successful')}})}/>}
              {isLogged && <Route path="/logout" render={render(Logout, { isLogged, logout: logoutFunc(setIsLogged, setUserData, setShow, setMessage) })} />}

              {isLogged && userData && userData.instructor && <Route path='/create-plan'  render={render(CreatePlan, {isLogged, userData, showChange: () => {setShow(true); setMessage('Plan Created')}})}  />}
              <Route path='/details/:id'  render={render(PlanDetails, {isLogged, userData})} />
              <Route path='/search/:query?' render={render(SearchedResults, {isLogged, userData})} />
              {isLogged && <Route path="/my-plans" render={render(MyPlans, { isLogged, userData })} />}

              <Route component={NotFound}  />
            </Switch>
          </userContext.Provider>
        </Router>
      </React.Fragment>
    )
}

export default App;

