import React from 'react';
import Header from '../Header';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './index.css'
import Plans from '../Plans';

const MyPlans = ({isLogged}) => {
    return (
        <Plans isLogged={isLogged}/>
    )
}

export default MyPlans;