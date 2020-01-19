import React, {useState} from 'react';
import './App.css';
import Loader from './Loader/Loader';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Posts from '../Posts/Posts';
import Main from './Main/Main';
import Footer from '../Footer/Footer';
import CreatePosts from '../Posts/Create-Post/Create-Post'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Logout from '../Logout/Logout'
import NotFound from '../Not-Found/Not-Found'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import userService from '../services/user-service';
import Profile from '../Profile/Profile';
import {userContext} from '../userContext'

function render(title, Cmp, otherProps) {
  return function(props) {
    return <Main title={title}  ><Cmp {...props} {...otherProps}/></Main>
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
      userData: null
    }
  }

  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ isLogged: false, userData: null });
      history.push('/');
      return null;
    });
  }
 
  login = (history, data) => {
    return userService.login(data).then((res) => {
      
      this.setState({isLogged: true, userData: res});
      history.push('/')
    });
  }

  

  render() {
    const {isLogged, userData} = this.state;
    
    return (
      <Router>
        <userContext.Provider value={userData}>
          <div className="App">
            <Loader local={true} isLoading={false} />
            <Navigation isLogged={isLogged} />
            <div className='Container'>
              <Aside isLogged={isLogged}  />
                <Switch>
                  <Route path="/" exact><Redirect to='/posts'/></Route>
                  <Route path="/posts" render={render('Posts', Posts, {isLogged})}/>
    
                  {isLogged && <Route path="/create-post" render={render('Create Post', CreatePosts, {isLogged})} />}

                  {isLogged && <Route path="/profile" render={render('Profile', Profile, {isLogged})} />}
                  
    
                  {!isLogged && <Route path="/login" render={render('Login', Login, {isLogged, login: this.login})}/>}
                  {!isLogged && <Route path="/register" render={render('Register', Register, {isLogged})}/>}
                  {isLogged && <Route path="/logout" render={render('Logout', Logout, { isLogged, logout: this.logout })} />}
    
                  <Route>
                    <Main title="Not Found"><NotFound /></Main>
                  </Route>
                </Switch>
            </div>
            <Footer isLogged={isLogged}  />
          </div>
        </userContext.Provider>
      </Router>
    );
  }

}

export default App;
