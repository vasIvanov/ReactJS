import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import CreatePlan from './Create-plan';
import PlanDetails from './PlanDetails';
import FavoritePlans from './FavoritePlans';
import NotFound from './NotFound';
import SearchedResults from './SearchedResults';
import { userContext } from './userContext';
import { Toast } from 'react-bootstrap';
import render from './utils/render';
import Plans from './Plans/index';
import Footer from './Footer';
import MyPlans from './MyPlans';
import EditPlan from './EditPlan';
import EditDance from './Dance/EditDance';
import CreateDance from './Dance/Create-dance';
import DanceDetails from './Dance/Dance-details';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from './features/toastSlice';

const App = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLogged =
    useSelector((state) => !!state.user.user) ||
    !!localStorage.getItem('username');
  const userPlans =
    (user && user.plans) || JSON.parse(localStorage.getItem('plans')) || null;

  console.log(userPlans);
  window.onbeforeunload = function () {
    if (isLogged && user) {
      localStorage.setItem('username', user.username);
      if (user.city) {
        localStorage.setItem('city', user.city);
      }
      localStorage.setItem('_id', user._id);
      localStorage.setItem('plans', JSON.stringify(user.plans));
      localStorage.setItem('instructor', user.instructor);
    }
  };

  const showingToast = useSelector((state) => state.toast.show);
  const toastMessage = useSelector((state) => state.toast.message);

  return (
    <React.Fragment>
      <Router>
        <userContext.Provider value={userData}>
          <div aria-live='polite' aria-atomic='true' className='toast-outer'>
            <div className='toast-inner'>
              <Toast
                onClose={() =>
                  dispatch(showToast({ show: false, message: '' }))
                }
                show={showingToast}
                delay={3000}
                autohide
              >
                <Toast.Body className='toast-body'>{toastMessage}</Toast.Body>
              </Toast>
            </div>
          </div>
          <Switch>
            {!isLogged && (
              <Route exact path='/' render={render(Home, { isLogged })} />
            )}
            {isLogged && userPlans && userPlans.length > 0 ? (
              <Route
                exact
                path='/'
                render={render(FavoritePlans, { isLogged })}
              />
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
            ((user && user.instructor) ||
              localStorage.getItem('instructor')) ? (
              <Route
                path='/create-plan'
                render={render(CreatePlan, {
                  isLogged,
                })}
              />
            ) : null}
            {isLogged &&
            ((user && user.instructor) ||
              localStorage.getItem('instructor')) ? (
              <Route
                path='/create-dance'
                render={render(CreateDance, {
                  isLogged,
                })}
              />
            ) : null}
            {isLogged &&
            ((user && user.instructor) ||
              localStorage.getItem('instructor')) ? (
              <Route path='/my-plans' render={render(MyPlans, { isLogged })} />
            ) : null}
            <Route
              path='/details/:id'
              render={render(PlanDetails, { isLogged, setUserData })}
            />
            <Route
              path='/dance-details/:id'
              render={render(DanceDetails, { isLogged, setUserData })}
            />
            <Route
              path='/edit/:id'
              render={render(EditPlan, {
                isLogged,
                setUserData,
              })}
            />
            <Route
              path='/edit-dance/:id'
              render={render(EditDance, {
                isLogged,
                setUserData,
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
        </userContext.Provider>
      </Router>
    </React.Fragment>
  );
};

export default App;
