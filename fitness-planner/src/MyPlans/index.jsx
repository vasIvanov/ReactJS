import React, {useState, useEffect, useContext} from 'react';
import './index.css'
import Plans from '../Plans';
import userServices from '../services/user-service'
import {userContext} from '../userContext';
import Header from '../Header';

const MyPlans = ({isLogged}) => {
    const userValue = useContext(userContext);
    const userId = (userValue && userValue._id) || localStorage.getItem('_id');
    const [plans, setPlans] = useState('');

    useEffect(() => {
        userServices.getUsers().then(r => {
            const user = r.filter(u => u._id === userId)[0];
            setPlans(user.plans);
        })
    }, [userId])

    return (
        <React.Fragment>
            <Header isLogged={isLogged}  bgColor='dark'/>
            <Plans plans={plans} isLogged={isLogged} categoriezed={false} />

        </React.Fragment>
    )
}

export default MyPlans;