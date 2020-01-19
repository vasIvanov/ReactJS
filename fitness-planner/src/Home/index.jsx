import React, { useState, Fragment } from 'react';
import './index.css';
import Header from '../Header';
import Jumbotron from '../Jumbotron';


const Home = () => {
    return (
        <Fragment>
            <Header />
            <div className='home-content'>
                <Jumbotron/>
            </div>
        </Fragment>
    )
}

export default Home