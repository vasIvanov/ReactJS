import React, { useState, useEffect } from 'react';
import userServices from '../../services/user-service';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../../features/planSlice';
import { getDances } from '../../features/danceSlice';

const StatisticsSection = () => {
    const [instructors, setInstructors] = useState('');
    const [users, setUsers] = useState('');
    // const [plans, setPlans] = useState('');
    // const [dances, setDances] = useState('');
    const plans = useSelector(state => state.plan.plans)
    const dances = useSelector(state => state.dance.dances)
    const dispatch = useDispatch()

    useEffect(() => {
        userServices.getInstructors().then(ins => setInstructors(ins));
        userServices.getUsers().then(users => setUsers(users));
        if(plans === null) {
          dispatch(getPlans())
        }

        if(dances === null) {
          dispatch(getDances())
        }
      }, [plans, dances, dispatch])
    
    return (
        <article className="content">
        <section className="statistics-media">
        </section>
        <section className="product-details">
            <ul>
                <li>We have {instructors.length} Instructors</li>
                <li>{plans && plans.length} Fintess plans to choose from</li>
                <li>{dances && dances.length} Dance events to choose from</li>
                <li>Over {users.length}  registered users </li>
                <li>Now is the time to join !!!</li>
            </ul>
        </section>
    </article>
    )
}   

export default StatisticsSection;