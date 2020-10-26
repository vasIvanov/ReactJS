import React, { useState, useEffect } from 'react';
import './index.css';
import { Tabs, Tab } from 'react-bootstrap';
import Plan from './Plan';
import planService from '../services/plan-service';
import Header from '../Header';

const Plans = ({ isLogged, history }) => {
  const [plans, setPlans] = useState('');
  useEffect(() => {
    let isMounted = true;
    planService.load().then((r) => {
      if (isMounted) {
        setPlans(r);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return plans ? (
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      <div className="plans-tabs">
        <Tabs
          className="custom"
          defaultActiveKey="all"
          id="controlled-tab-example"
        >
          <Tab eventKey="all" title="All Plans">
            <div className="plans">
              {plans.map((plan, i) => (
                <Plan
                  history={history}
                  key={i}
                  plan={plan}
                  isLogged={isLogged}
                />
              ))}
            </div>
          </Tab>
          <Tab eventKey="muscle-gain" title="Muscle Gain">
            <div className="plans">
              {plans.map((plan, i) => {
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
              {plans.map((plan, i) => {
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
        </Tabs>
      </div>

      {plans.length < 1 && (
        <div className="no-plans-fallback">
          <p>No plans are created yet!</p>
        </div>
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      Loading ...
    </React.Fragment>
  );
};

export default Plans;
