import React, { Fragment, Main } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import CreatePlan from './Create-plan'


const App = () => {
  
 
  
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login'  component={Login} />
        <Route path='/register'  component={Register} />
        <Route path='/create-plan'  component={CreatePlan} />
      </Switch>
    </Router>
    
  )
}

export default App;
