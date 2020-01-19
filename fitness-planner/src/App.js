import React, { Fragment, Main } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './Login'
import Header from './Header'
import Register from './Register'
import Home from './Home'


const App = () => {
  
 
  
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login'  component={Login} />
        <Route path='/register'  component={Register} />
      </Switch>
    </Router>
    
  )
}

export default App;
