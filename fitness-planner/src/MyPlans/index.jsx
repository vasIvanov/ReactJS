import React, {useState, useEffect, useContext} from 'react';
import './index.css'
import Plan from '../Plans/Plan';
import userServices from '../services/user-service'
import {userContext} from '../userContext';
import Header from '../Header'
import {Button} from 'react-bootstrap';

const MyPlans = ({isLogged}) => {
    const userValue = useContext(userContext);
    const userId = (userValue && userValue._id) || localStorage.getItem('_id');
    const [plans, setPlans] = useState('');
    const [temperature, setTemperature] = useState('');
    const [feelTemp, setFeelTemp] = useState('');
    const [units, setUnits] = useState('metric');
    const [unitsSign, setUnitsSign] = useState('C');
    let message = '';
    let city = '';
    if(isLogged) {
        city = (userValue && userValue.city) || localStorage.getItem('city') || false;
    }
    
    if((feelTemp >=10 && unitsSign === 'C') || (feelTemp >= 50 && unitsSign === 'F')) {
        message = 'Consider going for a walk.'
    }

    useEffect(() => {
        if(isLogged && city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&APPID=c27fcad2928805171f49ebfa27cfa75b&units=${units}`).then(r => r.json()).then(r => {
                setTemperature(r.main.temp);
                setFeelTemp(r.main.feels_like)
            })
        }
    }, [units, unitsSign, isLogged, city])

    useEffect(() => {
        userServices.getUsers().then(r => {
            const user = r.filter(u => u._id === userId)[0];
            setPlans(user.plans);
        })
    }, [userId])

    return (
        <React.Fragment>
            <Header isLogged={isLogged}  bgColor='dark'/>
            {isLogged && city ? 
                    <div>
                        <p>{temperature && feelTemp ? `Temperature in ${city} is ${temperature}${unitsSign}  Real feel ${feelTemp}${unitsSign}.` : 'Loading...'}</p>
                        <p>{message ? message : null}</p>
                        <Button variant='light' onClick={() => {setUnits('imperial'); setUnitsSign('F') }} type="button">Imperial</Button>
                        <Button variant='light' onClick={() => {setUnits('metric'); setUnitsSign('C') }} type="button">Metric</Button>
                    </div> 
            : null}
            {plans ? <div className="plans-tabs">
                <div className="plans">
                    {plans.map((plan, i) => (<Plan key={i} plan={plan} isLogged={isLogged}/>))}
                </div>
            </div> : 'Loading ...'}
            
        </React.Fragment>
    )
}

export default MyPlans;