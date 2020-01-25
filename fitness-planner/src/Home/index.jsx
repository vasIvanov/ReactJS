import React, { useState, Fragment, useEffect } from 'react';
import './index.css';
import Jumbotron from '../Jumbotron';
import Plans from '../Plans';
import planService from '../services/plan-service';

const Home = ({isLogged}) => {
    const [temperature, setTemperature] = useState('');
    const [feelTemp, setFeelTemp] = useState('');
    const [units, setUnits] = useState('metric');
    const [unitsSign, setUnitsSign] = useState('C');
    const [plans, setPlans] = useState('');
    let message = '';
    
    if((feelTemp >=10 && unitsSign === 'C') || (feelTemp >= 50 && unitsSign === 'F')) {
        message = 'Consider going for a walk.'
    }

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=plovdiv&APPID=c27fcad2928805171f49ebfa27cfa75b&units=${units}`).then(r => r.json()).then(r => {
            setTemperature(r.main.temp);
            setFeelTemp(r.main.feels_like)
        })
    }, [units, unitsSign])

    useEffect(() => {
        planService.load().then(r => {
            setPlans(r)
        })
    }, [])

    return (
        <Fragment>
            <div className='home-content'>
                <Jumbotron isLogged={isLogged}/>
                <p>{temperature && feelTemp ? `Temperature in Plovdiv is ${temperature}${unitsSign}  Real feel ${feelTemp}${unitsSign}.` : 'Loading...'}</p>
                <p>{message ? message : null}</p>
                <button onClick={() => {setUnits('imperial'); setUnitsSign('F') }} type="button">Imperial</button>
                <button onClick={() => {setUnits('metric'); setUnitsSign('C') }} type="button">Metric</button>
                {plans ? <Plans plans={plans}  isLogged={isLogged} categoriezed={true}/> : <div>Loading...</div>}
                
                
            </div>
        </Fragment>
    )
}

export default Home
