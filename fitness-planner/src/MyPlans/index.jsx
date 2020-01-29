import React, {useState, useEffect} from 'react';
import './index.css'
import Plans from '../Plans';
import userServices from '../services/user-service'

const MyPlans = ({isLogged, userData}) => {
    const userId = userData._id
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