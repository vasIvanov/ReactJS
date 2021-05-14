import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './index.css';
import { Tabs, Tab } from 'react-bootstrap';
import Plan from './Plan';
import Dance from '../Dance/Dance';
import planService from '../services/plan-service';
import danceService from '../services/dance-service';
import Header from '../Header';

const Plans = ({ isLogged, history }) => {
  const [plans, setPlans] = useState('');
  const [dances, setDances] = useState('');
 
  const fetchDances = useCallback(() => {
    danceService.load().then(res => {
      setDances(res);
    })
  }, [])

  const fetchPlans = useCallback((isMounted) => {
    planService.load().then((r) => {
      if (isMounted) {
        setPlans(r);
      }
    });
  }, [])

  useEffect(() => {
    let isMounted = true;
    fetchPlans(isMounted)
    fetchDances()
    return () => {
      isMounted = false;
    };
  }, [fetchPlans, fetchDances]);

  return (plans || dances) ? (
    <React.Fragment>
      <Header history={history} isLogged={isLogged} bgColor="dark" />
      <div className="plans-tabs">
        {plans || dances ?<Tabs
          className="custom"
          defaultActiveKey="all"
          id="controlled-tab-example"
        >
          <Tab eventKey="all" title="All Activities">
            <div className="plans">
              { plans && plans.map((plan, i) => (
                <Plan
                  history={history}
                  key={i}
                  plan={plan}
                  isLogged={isLogged}
                />
              ))}
              {dances && dances.map((dance, i) => {console.log('dance log1'); return (
                
                <Dance
                  history={history}
                  key={i}
                  dance={dance}
                  isLogged={isLogged}
                />
              )})}
            </div>
          </Tab>
          <Tab eventKey="muscle-gain" title="Muscle Gain">
            <div className="plans">
              {plans && plans.map((plan, i) => {
                if (plan.goal.toLowerCase() === 'muscle gain') {
                  return (
                    <Plan
                      history={history}
                      key={i}
                      plan={plan}
                      isLogged={isLogged}
                    />
                  );
                }
                return null;
              })}
            </div>
          </Tab>
          <Tab eventKey="weight-loss" title="Weight Loss">
            <div className="plans">
              {plans && plans.map((plan, i) => {
                if (plan.goal.toLowerCase() === 'weight loss') {
                  return (
                    <Plan
                      history={history}
                      key={i}
                      plan={plan}
                      isLogged={isLogged}
                    />
                  );
                }
                return null;
              })}
            </div>
          </Tab>
          <Tab eventKey="dance-events" title="Dance Events">
            <div className="plans">
              {dances && dances.map((dance, i) => {
                console.log('dance log');
                  return (
                    <Dance
                      history={history}
                      key={i}
                      dance={dance}
                      isLogged={isLogged}
                    />
                  );
              })}
            </div>
          </Tab>
        </Tabs> : null}

      </div>

      {/* {plans.length < 1 && dances.length < 1 && (
        <div className="no-plans-fallback">
          <p>No Activities are created yet!</p>
        </div>
      )} */}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      Loading ...
    </React.Fragment>
  );
};

export default Plans;
