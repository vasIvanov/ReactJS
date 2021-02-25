import React, { useState, useEffect } from 'react';
import userServices from '../../services/user-service';
import planServices from '../../services/plan-service';
import danceServices from '../../services/dance-service';
import './index.css';

const StatisticsSection = () => {
    const [instructors, setInstructors] = useState('');
    const [plans, setPlans] = useState('');
    const [users, setUsers] = useState('');
    const [dances, setDances] = useState('');

    useEffect(() => {
        userServices.getInstructors().then(ins => setInstructors(ins));
        planServices.load().then(plans => setPlans(plans));
        userServices.getUsers().then(users => setUsers(users));
        danceServices.load().then(dances => setDances(dances));
      }, [])
    
    return (
        <article className="content">
        <section className="statistics-media">
        </section>
        <section className="product-details">
            <ul>
                <li>We have {instructors.length} Instructors</li>
                <li>{plans.length} Fintess plans to choose from</li>
                <li>{dances.length} Dance events to choose from</li>
                <li>Over {users.length}  registered users </li>
                <li>Now is the time to join !!!</li>
            </ul>
        </section>
    </article>
    )
}   

export default StatisticsSection;