import React from 'react';
import './App.css';
import Loader from './Loader/Loader';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Posts from '../Posts/Posts';
import Main from './Main/Main';
import Footer from '../Footer/Footer';
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
import Profile from '../Profile/Profile';
import store from '../store';
import { Provider } from 'react-redux';
import CreatePost from '../Posts/Create-Post/Create-Post';


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

  isLoggedStateChange = (service) => {
    service === 'login' ? this.setState({isLogged: true}) : this.setState({isLogged: false})
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
                  
                  {!this.state.isLogged && <Route path="/login" render={(props) => <Login {...props} isLoggedStateChange={this.isLoggedStateChange} />} />}
                  {!this.state.isLogged && <Route path="/register" component={Register}/>}
                  {this.state.isLogged && <Route path="/logout" render={(props) => <Logout {...props}  isLoggedStateChange={this.isLoggedStateChange} />}/>}
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
