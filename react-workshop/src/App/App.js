import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Posts from '../Posts/Posts';
import Main from './Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className='Container'>
        <Aside />
        <Main title="Hello">
          <Posts />
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
