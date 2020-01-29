import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './Login'
import Register from './Register';
import Home from './Home';
import CreatePlan from './Create-plan';
import PlanDetails from './PlanDetails';
import MyPlans from './MyPlans';
import Header from './Header';
import Logout from './Logout';
import NotFound from './NotFound';
import SearchedResults from './SearchedResults';
import userService from './services/user-service';
import {userContext} from './userContext';
import { Toast } from 'react-bootstrap';

function render(Cmp, otherProps) {
  return function(props) {
    return <Cmp {...props} {...otherProps}/>
  }
}

function parseCookies() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc
  }, {})

}

class App extends React.Component {
  constructor(props) {
    super(props)
    const cookies = parseCookies();
    const isLogged = !!cookies['x-auth-token'];
    this.state = {
      isLogged,
      userData: null,
      show: false,
      message: ''
    }
  }
  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ isLogged: false, userData: null, show: true, message:'Logout Successful!' });
      history.push('/');
      return null;
    });
  }
 
  login = (history, data) => {
    return userService.login(data).then((res) => {
      this.setState({isLogged: true, userData: res, show: true, message:'Login Successful!'});
      history.push('/')
    })
  }
  
  
  render() {
    const {isLogged, userData} = this.state;
    
    return(
      <React.Fragment>
        <Router>
          <userContext.Provider value={userData}>
            <Header userData={userData} isLogged={isLogged}/>
            <div
            aria-live="polite"
            aria-atomic="true"
            style={{
              position: 'relative',
              minHeight: '0px',
            }} >
              <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }} >
                <Toast style={{backgroundColor:"#D4EDDA", color: '#155724'}} onClose={() => this.setState({show:false})} show={this.state.show} delay={3000} autohide>
                <Toast.Body>
                    {this.state.message}
                </Toast.Body>
              </Toast>
            </div>
          </div>
            <Switch>
              <Route exact path="/" render={render(Home, {isLogged, userData})} />
              {!isLogged && <Route path="/login" render={render(Login, {isLogged, login: this.login})}/>}
              {!isLogged && <Route path="/register" render={render(Register, {isLogged, showChange: () => this.setState({show: true, message: 'Registration Successful'})})}/>}
              {isLogged && <Route path="/logout" render={render(Logout, { isLogged, logout: this.logout })} />}

              {isLogged && userData && userData.instructor && <Route path='/create-plan'  render={render(CreatePlan, {isLogged, userData, showChange: () => this.setState({show: true, message: 'Plan Created'})})}  />}
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
}

export default App;

