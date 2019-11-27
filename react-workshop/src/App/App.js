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
          <Main title="Hello">
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/create-post"  component={CreatePosts} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
