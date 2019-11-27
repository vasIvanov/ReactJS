import React from 'react';
import './App.css';
import Loader from './Loader/Loader';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Posts from '../Posts/Posts';
import Main from './Main/Main';
import Footer from '../Footer/Footer';
import CreatePosts from '../Posts/Create-Post/Create-Post'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFound from '../Not-Found/Not-Found'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Loader local={true} isLoading={false} />
        <Navigation />
        <div className='Container'>
          <Aside />
            <Switch>
              <Route path="/" exact>
                <Main title="Posts"><Posts /></Main>
              </Route>
              <Route path="/create-post">
                <Main title="Create Posts"><CreatePosts /></Main>
              </Route>
              <Route path="/profile">
                <Main title="Profile"><Profile /></Main>
              </Route> 
              <Route path="/login">
                <Main title="Login"><Login /></Main>
              </Route>
              <Route path="/register">
                <Main title="Register"><Register /></Main>
              </Route>
              <Route>
                <Main title="Not Found"><NotFound /></Main>
              </Route>
            </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
