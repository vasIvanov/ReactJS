import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/HomePage';
import CreatePlan from './Pages/Create-plan';
import PlanDetails from './Pages/PlanDetails';
import FavoritePlans from './Pages/FavoritePlans/';
import NotFound from './Pages/NotFound';
import SearchedResults from './Pages/SearchedResults';
import { Toast } from 'react-bootstrap';
import render from './utils/render';
import Plans from './Pages/Plans';
import Footer from './Components/Footer';
import MyPlans from './Pages/MyPlans';
import CreateDance from './Pages/Create-dance/Create-dance';
import DanceDetails from './Pages/Dance-details/Dance-details';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from './features/toastSlice';
import Header from './Components/Header';
import { useState } from 'react';

const App = ({ history, location }) => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLogged =
    useSelector((state) => !!state.user.user) ||
    !!localStorage.getItem('username');
  const userPlans =
    (user && user.plans) || JSON.parse(localStorage.getItem('plans')) || null;

  window.onbeforeunload = function () {
    if (isLogged && user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };
  console.log(location.pathname);
  const showingToast = useSelector((state) => state.toast.show);
  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => setUrl(location.pathname), [setUrl, location.pathname]);

  return (
    <React.Fragment>
      <div aria-live='polite' aria-atomic='true' className='toast-outer'>
        <div className='toast-inner'>
          <Toast
            onClose={() => dispatch(showToast({ show: false, message: '' }))}
            show={showingToast}
            delay={3000}
            autohide
          >
            <Toast.Body className='toast-body'>{toastMessage}</Toast.Body>
          </Toast>
        </div>
      </div>
      {url === '/' ? (
        <Header
          history={history}
          isLogged={isLogged}
          fixed='top'
          homepage={true}
        />
      ) : (
        <Header history={history} isLogged={isLogged} />
      )}
      <Switch>
        {!isLogged && (
          <Route exact path='/' render={render(Home, { isLogged })} />
        )}
        {isLogged && userPlans && userPlans.length > 0 ? (
          <Route exact path='/' render={render(FavoritePlans, { isLogged })} />
        ) : (
          <Route
            exact
            path='/'
            render={render(Plans, { isLogged, categorized: true })}
          />
        )}
        {!isLogged && <Route path='/login' render={render(Login)} />}
        {!isLogged && <Route path='/register' render={render(Register)} />}

        {isLogged &&
        ((user && user.instructor) || localStorage.getItem('instructor')) ? (
          <Route
            path='/create-plan'
            render={render(CreatePlan, {
              isLogged,
            })}
          />
        ) : null}
        {isLogged &&
        ((user && user.instructor) || localStorage.getItem('instructor')) ? (
          <Route
            path='/create-dance'
            render={render(CreateDance, {
              isLogged,
            })}
          />
        ) : null}
        {isLogged &&
        ((user && user.instructor) || localStorage.getItem('instructor')) ? (
          <Route path='/my-plans' render={render(MyPlans, { isLogged })} />
        ) : null}
        <Route path='/details/:id' render={render(PlanDetails, { isLogged })} />
        <Route
          path='/dance-details/:id'
          render={render(DanceDetails, { isLogged })}
        />
        <Route
          path='/edit/:id'
          render={render(CreatePlan, {
            isLogged,
          })}
        />
        <Route
          path='/edit-dance/:id'
          render={render(CreateDance, {
            isLogged,
          })}
        />
        <Route
          path='/plans'
          render={render(Plans, { isLogged, categorized: true })}
        />
        <Route
          path='/search/:query?'
          render={render(SearchedResults, { isLogged })}
        />
        {isLogged && (
          <Route
            path='/favorite-plans'
            render={render(FavoritePlans, { isLogged })}
          />
        )}

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(App);
