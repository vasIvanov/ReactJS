import React, { useState, useEffect } from 'react';
import userServices from '../../services/user-service';
import planServices from '../../services/plan-service';
import './index.css';

const StatisticsSection = () => {
    const [instructors, setInstructors] = useState('');
    const [plans, setPlans] = useState('');
    const [users, setUsers] = useState('');

    useEffect(() => {
        userServices.getInstructors().then(ins => setInstructors(ins));
        planServices.load().then(plans => setPlans(plans));
        userServices.getUsers().then(users => setUsers(users))
    }, [])
    
    return (
        <article className="content">
        <section className="statistics-media">
        </section>
        <section className="product-details">
            <ul>
                <li>We have {instructors.length} Instructors</li>
                <li>{plans.length} Plans to choose from</li>
                <li>Over {users.length}  registered users </li>
                <li>Now is the time to join !!!</li>
            </ul>
        </section>
    </article>
    )
}   

export default StatisticsSection;