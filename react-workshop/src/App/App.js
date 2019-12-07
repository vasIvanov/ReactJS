import React from 'react';
import './App.css';
import Loader from './Loader/Loader';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Posts from '../Posts/Posts';
import Main from './Main/Main';
import Footer from '../Footer/Footer';
import CreatePosts from '../Posts/Create-Post/Create-Post'
// import Profile from '../Profile/Profile'
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

const Profile = React.lazy(() => import('../Profile/Profile'));

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
      isLogged
    }
  }

  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ isLogged: false });
      history.push('/');
      return null;
    });
  }
 
  login = (history, data) => {
    userService.login(data).then(() => {
      this.setState({
        isLogged: true
      });
      history.push('/')
      return null
    })
  }

  render() {
    const {isLogged} = this.state;
    return (
      <Router>
        <div className="App">
          <Loader local={true} isLoading={false} />
          <Navigation isLogged={isLogged} />
          <div className='Container'>
            <Aside isLogged={isLogged}  />
              <Switch>
                <Route path="/" exact><Redirect to='/posts'/></Route>
                <Route path="/posts" render={render('Posts', Posts, {isLogged})}/>
  
  
  
  
                <Route path="/create-post">
                  <Main title="Create Posts"><CreatePosts /></Main>
                </Route>
  
                <Route path="/profile">
                  <Main title="Profile">
                    <React.Suspense fallback={<Loader isLoading={true} />}>
                      <Profile />
                    </React.Suspense>
                  </Main>
                </Route> 
  
                <Route path="/login" render={render('Login', Login, {isLogged, login: this.login})}/>
                <Route path="/register" render={render('Register', Register, {isLogged})}/>
                <Route path="/logout" render={render('Logout', Logout, { isLogged, logout: this.logout })} />
  
                <Route>
                  <Main title="Not Found"><NotFound /></Main>
                </Route>
              </Switch>
          </div>
          <Footer isLogged={isLogged}  />
        </div>
      </Router>
    );
  }

}

export default App;
