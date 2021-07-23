import React, { useEffect } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import Footer from './Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from './features/toastSlice';
import Header from './Components/Header';
import { useState } from 'react';
import Routes from './Routes';

const App = ({ history, location }) => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isLogged =
    useSelector((state) => !!state.user.user) ||
    !!localStorage.getItem('username');

  window.onbeforeunload = function () {
    if (isLogged && user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

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
      {url === '/' && !user ? (
        <Header
          history={history}
          isLogged={isLogged}
          fixed='top'
          homepage={true}
        />
      ) : (
        <Header history={history} isLogged={isLogged} />
      )}
      <Routes />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(App);
