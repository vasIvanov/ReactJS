import React, { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../../features/planSlice';
import { getDances } from '../../features/danceSlice';

const StatisticsSection = () => {
  const plans = useSelector(state => state.plan.plans)
  const dances = useSelector(state => state.dance.dances)
  const dispatch = useDispatch()

  useEffect(() => {
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
              <li>{plans && plans.length} Fintess plans to choose from</li>
              <li>{dances && dances.length} Dance events to choose from</li>
              <li>Now is the time to join !!!</li>
          </ul>
      </section>
  </article>
  )
}   

export default StatisticsSection;