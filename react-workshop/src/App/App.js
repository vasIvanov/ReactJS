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
import store from '../store';
import { Provider } from 'react-redux';
import CreatePost from '../Posts/Create-Post/Create-Post';
import {logoutUser} from '../actions/userActions'


// function render(title, Cmp, otherProps) {
//   return function(props) {
//     return <Main title={title}  ><Cmp {...props} {...otherProps}/></Main>
//   }
// }

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
    this.state = {
      isLogged: !!cookies['x-auth-token']
    }
  }

  logoutStateChange = () => {
    // userService.logout().then(() => {
    //   this.setState({ isLogged: false, user: null });
    //   history.push('/');
    //   return null;
    // });
    this.setState({isLogged: false})
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }


 
  loginStateChange = () => {
    this.setState({isLogged: true})
    localStorage.setItem('username', store.getState().user.user.username)
    localStorage.setItem('userId', store.getState().user.user._id)
    console.log(localStorage.getItem('username'), localStorage.getItem('userId'));
  }


  render() {
    return (
      <Provider store={store}>
      <Router>
          <div className="App">
            <Loader local={true} isLoading={false} />
            <Navigation isLogged={this.state.isLogged} />
            <div className='Container'>
              <Aside isLogged={this.state.isLogged}  />
                <Switch>
                  <Route path="/" exact><Redirect to='/posts'/></Route>
                  <Route path="/posts" render={(props) => <Posts {...props} isLogged={this.state.isLogged} />}/>
    
                  {/* {isLogged && <Route path="/create-post" render={render('Create Post', CreatePosts, {isLogged})} />} */}
                  {this.state.isLogged && <Route path="/create-post" component={CreatePost} />}

                  {this.state.isLogged && <Route path="/profile" component={Profile}  />}
                  
    
                  {/* {!isLogged && <Route path="/login" render={render('Login', Login, {setUserState: this.setState})}/>} */}
                  
                  {!this.state.isLogged && <Route path="/login" render={(props) => <Login {...props} loginStateChange={this.loginStateChange} />} />}
                  {!this.state.isLogged && <Route path="/register" component={Register}/>}
                  {this.state.isLogged && <Route path="/logout" render={(props) => <Logout {...props}  logoutStateChange={this.logoutStateChange} />}/>}
                  {/* {this.isLogged && <Route path="/logout" render={render('Logout', Logout, {  logout: this.logout })} />} */}
    
                  <Route>
                    <Main title="Not Found"><NotFound /></Main>
                  </Route>
                </Switch>
            </div>
            <Footer isLogged={this.state.isLogged}  />
          </div>
      </Router>
      </Provider>
    );
  }

}

export default App;
