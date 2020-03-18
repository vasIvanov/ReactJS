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
import Logout from './Logout';
import NotFound from './NotFound';
import SearchedResults from './SearchedResults';
import {userContext} from './userContext';
import { Toast } from 'react-bootstrap';
import render from './utils/render';
import parseCookies from './utils/parseCookies';
import {loginFunc, logoutFunc} from './utils/user';
import Plans from './Plans/index';
import Footer from './Footer';

const App = () => {
  const cookies = parseCookies();
  const [userData, setUserData] = useState(null);
  const [isLogged, setIsLogged] = useState(!!cookies['x-auth-token']);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const userPlans = (userData && userData.plans ) || JSON.parse(localStorage.getItem('plans')) || null;
  
  window.onbeforeunload = function() {
    if(isLogged && userData) {
      localStorage.setItem('username', userData.username);
      if(userData.city) {
        localStorage.setItem('city', userData.city);
      }
      localStorage.setItem('_id', userData._id);
      localStorage.setItem('plans', JSON.stringify(userData.plans));
      localStorage.setItem('instructor', userData.instructor);
    }
  }


  
    return (
      <React.Fragment>
        <Router>
          <userContext.Provider value={userData}>
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
              {!isLogged && <Route exact path="/" render={render(Home, {isLogged})} />}
              {(isLogged && userPlans && userPlans.length > 0 ) ? <Route exact path="/" render={render(MyPlans, {isLogged})} /> : <Route exact path="/" render={render(Plans, {isLogged, categorized: true})} />}
              {!isLogged && <Route path="/login" render={render(Login, {isLogged, login: loginFunc(setIsLogged, setUserData, setShow, setMessage)})}/>}
              {!isLogged && <Route path="/register" render={render(Register, {isLogged, showChange: () => {setShow(true); setMessage('Registration Successful')}})}/>}
              {isLogged && <Route path="/logout" render={render(Logout, { isLogged, logout: logoutFunc(setIsLogged, setUserData, setShow, setMessage) })} />}

              {isLogged && ((userData && userData.instructor) || localStorage.getItem('instructor')) ? <Route path='/create-plan'  render={render(CreatePlan, {isLogged, showChange: () => {setShow(true); setMessage('Plan Created')}})}  /> : null}
              <Route path='/details/:id'  render={render(PlanDetails, {isLogged, setUserData})} />
              <Route path='/plans'  render={render(Plans, {isLogged, categorized: true} )} />
              <Route path='/search/:query?' render={render(SearchedResults, {isLogged})} />
              {isLogged && <Route path="/my-plans" render={render(MyPlans, { isLogged })} />}

              <Route component={NotFound}  />
            </Switch>
            <Footer />
          </userContext.Provider>
        </Router>
      </React.Fragment>
    )
}

export default App;

