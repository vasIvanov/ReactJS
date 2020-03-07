import React, {useState, useEffect, useContext} from 'react';
import './index.css'
import Plans from '../Plans';
import userServices from '../services/user-service'
import {userContext} from '../userContext';

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
        <Plans plans={plans} isLogged={isLogged} categoriezed={false} />
    )
}

export default MyPlans;